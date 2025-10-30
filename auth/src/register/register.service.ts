import * as crypto from 'crypto';
import firebaseAdmin from 'firebase-admin';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import {
  ConfirmUserEvent,
  ConfirmUserEventResponse,
  CreateUserEvent,
  CreateUserEventResponse,
  CreateUserEventUserRole,
  SetFirebaseUidEvent,
  UserEmailConfirmationRequestedEvent,
} from '@package/types/dist/events';
import { signInWithCustomToken } from 'firebase/auth';
import { GetUserByEmailService } from '@package/general';
import { FirebaseService } from '../firebase/firebase.service';
import { RegisterArgs } from '../../types/graphql/register/register.args';
import { RegisterOutput } from '../../types/graphql/register/register.output';
import { LoginService } from '../login/login.service';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  constructor(
    private configService: ConfigService,
    private readonly firebaseService: FirebaseService,
    private readonly getUserByEmailService: GetUserByEmailService,
    @Inject(Topic.CORE_USER_CREATE)
    private readonly createUserServiceBusClient: AzureServiceBusClient<
      CreateUserEvent,
      CreateUserEventResponse
    >,
    @Inject(Topic.CORE_USER_CONFIRM)
    private readonly confirmUserServiceBusClient: AzureServiceBusClient<
      ConfirmUserEvent,
      ConfirmUserEventResponse
    >,
    @Inject(Topic.USER_EMAIL_CONFIRMATION_REQUESTED)
    private readonly userEmailConfirmationRequestedServiceBusClient: AzureServiceBusClient<UserEmailConfirmationRequestedEvent>,
    @Inject(Topic.CORE_USER_SET_FIREBASE_UID)
    private readonly setFirebaseUidServiceBusClient: AzureServiceBusClient<SetFirebaseUidEvent>,
    private readonly loginService: LoginService
  ) {}

  async register(args: RegisterArgs): Promise<RegisterOutput> {
    // Create a new user with admin privileges.
    const adminAuth = this.firebaseService.getAdminAuth();

    // Create a new user with the given credentials.
    let user: firebaseAdmin.auth.UserRecord;
    try {
      user = await adminAuth.createUser({
        email: args.email,
        password: args.password,
        disabled: true,
        emailVerified: false,
      });
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        // Throw graphql error.
        throw new Error('Email already exists');
      } else {
        throw new Error('Failed to create user in provider');
      }
    }

    // Create a user with registration token.
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    let success = false;

    try {
      success = await this.createUser(args, confirmationToken);
    } catch (error) {
      this.logger.error(error);
    }

    if (!success) {
      // Delete user.
      await adminAuth.deleteUser(user.uid);
      throw new Error('Failed to create user in database');
    }

    // Send email to user.
    await this.sendConfirmationEmail(args.email, confirmationToken);

    return { success };
  }

  async createUser(
    args: RegisterArgs,
    confirmationToken: string
  ): Promise<boolean> {
    // Create user in core service
    const body: CreateUserEvent = {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      phoneNumber: args.phoneNumber,
      confirmationToken,
      privacySettings: args.privacySettings,
      role: CreateUserEventUserRole.USER,
    };

    // Send message to service bus.
    let response: { body: CreateUserEventResponse };
    try {
      response = await this.createUserServiceBusClient.sendAndReceive({
        payload: {
          body,
        },
      });
    } catch (error: unknown) {
      this.logger.error(error);
      throw new Error('Failed to send message to core service');
    }

    // Check if message was received successfully.
    if (!response?.body) {
      throw new Error('Did not receive response from core service');
    }

    return response.body?.success;
  }

  async sendConfirmationEmail(email: string, confirmationToken: string) {
    try {
      const user = await this.getUserByEmailService.getUserByEmail(email);
      const options = {};
      const body: UserEmailConfirmationRequestedEvent = {
        owner: {
          email,
          id: user.id,
          firstName: user.firstName,
          settings: user.settings,
        },
        confirmationToken,
      };
      await this.userEmailConfirmationRequestedServiceBusClient.emit({
        payload: {
          body,
        },
        options,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async confirm(confirmationToken: string) {
    const clientAuth = this.firebaseService.getClientAuth();

    // Call confirm user on core service.
    const body = {
      confirmationToken,
    };

    // Send message to service bus.
    const response = await this.confirmUserServiceBusClient.sendAndReceive({
      payload: {
        body,
      },
    });

    // Check if message was received successfully.
    if (!response?.body) {
      throw new Error('Did not receive response from core service');
    }

    // Check for errors.
    if (!response.body.success) {
      switch (response.body.errorType) {
        case 'USER_NOT_FOUND':
          throw new Error('User not found');
        case 'USER_ALREADY_CONFIRMED':
          throw new Error('User already confirmed');
        default:
          throw new Error('Unknown error');
      }
    }

    // Confirm user in firebase.
    const auth = firebaseAdmin.auth();
    const foundUser = await auth.getUserByEmail(response.body.email);
    await auth.updateUser(foundUser.uid, {
      emailVerified: true,
      disabled: false,
    });

    // Generate token.
    const customToken = await auth.createCustomToken(foundUser.uid);

    const { user: firebaseUser } = await signInWithCustomToken(
      clientAuth,
      customToken
    );

    // Set firebase uid in core service
    await this.setFirebaseUidServiceBusClient.emit({
      payload: {
        body: {
          email: response.body.email,
          firebaseUid: foundUser.uid,
        },
      },
    });

    // Generate cache and return token.
    return this.loginService.generateCacheAndLoginResponse(firebaseUser);
  }
}
