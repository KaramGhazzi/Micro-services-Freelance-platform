import * as crypto from 'crypto';
import firebaseAdmin from 'firebase-admin';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AzureServiceBusClient,
  Topic,
  ReceivedBusMessage,
} from '@package/azure-service-bus';
import {
  InviteUserEvent,
  GetByInviteTokenEventResponse,
  RemoveInviteTokenEvent,
  SetUserPrivacySettingsEvent,
  SetUserPrivacySettingsEventResponse,
  CheckInviteTokenEvent,
  GetByInviteTokenEvent,
  InviteUserEventResponse,
  CheckInviteTokenEventResponse,
  UserInviteCreatedEvent,
  SetFirebaseUidEvent,
  SetFirebaseUidEventResponse,
  RemoveInviteTokenEventResponse,
} from '@package/types/dist/events';
import { GetUserByEmailService } from '@package/general';
import { FirebaseService } from '../firebase/firebase.service';
import { LoginService } from '../login/login.service';
import { InviteArgs } from '../../types/graphql/invite/invite.args';
import { InviteOutput } from '../../types/graphql/invite/invite.output';
import { ConfirmInviteArgs } from '../../types/graphql/invite/confirm-invite.args';

@Injectable()
export class InviteService {
  private readonly logger = new Logger(InviteService.name);

  constructor(
    private configService: ConfigService,
    private readonly firebaseService: FirebaseService,
    private readonly getUserByEmailService: GetUserByEmailService,
    @Inject(Topic.CORE_USER_INVITE)
    private readonly inviteUserServiceBusClient: AzureServiceBusClient<
      InviteUserEvent,
      InviteUserEventResponse
    >,
    @Inject(Topic.CORE_USER_GET_BY_INVITE_TOKEN)
    private readonly getByInviteTokenServiceBusClient: AzureServiceBusClient<
      GetByInviteTokenEvent,
      GetByInviteTokenEventResponse
    >,
    @Inject(Topic.CORE_USER_SET_PRIVACY_SETTINGS)
    private readonly setPrivacySettingsServiceBusClient: AzureServiceBusClient<
      SetUserPrivacySettingsEvent,
      SetUserPrivacySettingsEventResponse
    >,
    @Inject(Topic.CORE_USER_REMOVE_INVITE_TOKEN)
    private readonly removeInviteTokenServiceBusClient: AzureServiceBusClient<
      RemoveInviteTokenEvent,
      RemoveInviteTokenEventResponse
    >,
    @Inject(Topic.CORE_USER_CHECK_INVITE_TOKEN)
    private readonly checkInviteTokenServiceBusClient: AzureServiceBusClient<
      CheckInviteTokenEvent,
      CheckInviteTokenEventResponse
    >,
    @Inject(Topic.USER_INVITE_CREATED)
    private readonly userInviteCreatedServiceBusClient: AzureServiceBusClient<UserInviteCreatedEvent>,
    @Inject(Topic.CORE_USER_SET_FIREBASE_UID)
    private readonly setFirebaseUidServiceBusClient: AzureServiceBusClient<
      SetFirebaseUidEvent,
      SetFirebaseUidEventResponse
    >,
    private readonly loginService: LoginService
  ) {}

  async invite(args: InviteArgs, companyId = -1): Promise<InviteOutput> {
    // Create a user with invite token.
    const inviteToken = crypto.randomBytes(32).toString('hex');

    // Create user in core service
    const body: InviteUserEvent = {
      email: args.email,
      userCompanyRole: args.userCompanyRole,
      companyId,
      message: args.message,
      inviteToken,
    };

    const { companyName, success } = await this.sendCreateUserMessage(body);

    if (!success) {
      throw new Error('Failed to create user in database');
    }

    // Send email to user.
    await this.sendInvitationEmail(
      args.email,
      inviteToken,
      companyName,
      args.message
    );

    return { success };
  }

  async sendCreateUserMessage(body: InviteUserEvent) {
    // Send message to service bus.
    let response: ReceivedBusMessage<InviteUserEventResponse>;
    try {
      response = await this.inviteUserServiceBusClient.sendAndReceive({
        payload: {
          body,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send message to core service');
    }

    // Check if message was received successfully.
    if (!response) {
      throw new Error('Did not receive response from core service');
    }

    return response?.body;
  }

  async sendInvitationEmail(
    email: string,
    confirmationToken: string,
    companyName: string,
    message: string
  ) {
    const user = await this.getUserByEmailService.getUserByEmail(email);

    try {
      const options = {};
      const body: UserInviteCreatedEvent = {
        owner: {
          email,
          id: user.id,
          settings: user.settings,
          firstName: user.firstName,
        },
        companyName,
        confirmationToken,
        message,
      };
      await this.userInviteCreatedServiceBusClient.emit({
        payload: {
          body,
        },
        options,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async confirmInvite(args: ConfirmInviteArgs) {
    const { inviteToken } = args;
    // Get user email by password reset token.
    const { email, uid } = await this.getUserEmailByInviteToken(inviteToken);

    if (!email) {
      throw new Error(`No user found for invite token ${inviteToken}`);
    }

    // Create a new user with admin privileges.
    const adminAuth = this.firebaseService.getAdminAuth();

    // Create a new user with the given credentials.
    let user: firebaseAdmin.auth.UserRecord;
    let existingUser = false;
    try {
      await adminAuth
        .getUserByEmail(email)
        .then((firebaseUser) => {
          if (uid && uid === firebaseUser.uid) {
            existingUser = true;
            user = firebaseUser;
          }
          throw new Error(
            `User uid ${uid} is not the same as the one in firebase ${firebaseUser.uid}`
          );
        })
        .catch(() => {
          this.logger.debug('User does not exist in firebase');
        });

      if (!user) {
        user = await adminAuth.createUser({
          email,
          password: args.password,
          disabled: false,
          emailVerified: true,
        });
      }

      const options = {};

      const settingsEvent: SetUserPrivacySettingsEvent = {
        firstName: args.firstName,
        lastName: args.lastName,
        phoneNumber: args.phoneNumber,
        email,
        privacySettings: args.privacySettings,
      };

      const settingsResponse =
        await this.setPrivacySettingsServiceBusClient.sendAndReceive({
          payload: {
            body: settingsEvent,
          },
          options,
        });

      if (!settingsResponse) {
        throw new Error('Failed to set privacy settings');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        // Throw graphql error.
        throw new Error('Email already exists');
      } else {
        throw new Error('Failed to create user in provider');
      }
    }

    if (!existingUser) {
      // Set firebase uid in core service
      await this.setFirebaseUidServiceBusClient.emit({
        payload: {
          body: {
            email,
            firebaseUid: user.uid,
          },
        },
      });
    }

    // Remove invite token.
    await this.removeInviteToken(inviteToken);

    return this.loginService.authenticateThroughFirebase(email, args.password);
  }

  async checkInvite(token: string) {
    // Ask core service to remove password reset token.
    const body: CheckInviteTokenEvent = {
      token,
    };

    const checkResponse =
      await this.checkInviteTokenServiceBusClient.sendAndReceive({
        payload: {
          body,
        },
      });

    if (!checkResponse) {
      throw new Error(
        'Did not receive response from core service while checking invite token'
      );
    }

    return checkResponse?.body;
  }

  async getUserEmailByInviteToken(
    inviteToken: string
  ): Promise<{ email: string; uid: string }> {
    // Ask core service to get user by invite token.
    const body = {
      inviteToken,
    };

    const response = await this.getByInviteTokenServiceBusClient.sendAndReceive(
      {
        payload: {
          body,
        },
      }
    );

    // Check if message was received successfully.
    if (!response) {
      throw new Error('Did not receive response from core service');
    }

    const responseBody: GetByInviteTokenEventResponse = response.body;

    // Check for errors.
    if (!responseBody.success) {
      if (responseBody.errorType === 'TOKEN_INVALID') {
        throw new Error('Token invalid');
      } else {
        throw new Error('Unknown error');
      }
    }

    return {
      email: responseBody.email,
      uid: responseBody.uid,
    };
  }

  async removeInviteToken(token: string) {
    // Ask core service to remove password reset token.
    const body: RemoveInviteTokenEvent = {
      token,
    };

    const removeResponse =
      await this.removeInviteTokenServiceBusClient.sendAndReceive({
        payload: {
          body,
        },
      });

    if (!removeResponse?.body) {
      throw new Error(
        'Did not receive response from core service while removing invite token'
      );
    }

    if (!removeResponse.body.success) {
      throw new Error('Failed to remove password reset token');
    }
  }
}
