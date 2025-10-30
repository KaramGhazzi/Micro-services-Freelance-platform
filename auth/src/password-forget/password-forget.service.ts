import { Inject, Injectable, Logger } from '@nestjs/common';
import firebaseAdmin from 'firebase-admin';
import * as crypto from 'crypto';
import {
  GetByPasswordResetTokenEvent,
  GetByPasswordResetTokenEventResponse,
  RemovePasswordResetTokenEvent,
  RemovePasswordResetTokenEventResponse,
  SetPasswordResetTokenEvent,
  SetPasswordResetTokenEventResponse,
  UserPasswordResetRequestedEvent,
  UserPasswordChangedEvent,
} from '@package/types/dist/events';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { GetUserByEmailService } from '@package/general';
import { FirebaseService } from '../firebase/firebase.service';
import { LegacyUserService } from '../legacy-user/legacy-user.service';

@Injectable()
export class PasswordForgetService {
  private readonly logger = new Logger(PasswordForgetService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly legacyUserService: LegacyUserService,
    private readonly getUserByEmailService: GetUserByEmailService,
    @Inject(Topic.CORE_USER_GET_BY_PASSWORD_RESET_TOKEN)
    private readonly getPasswordResetTokenServiceBusClient: AzureServiceBusClient<
      GetByPasswordResetTokenEvent,
      GetByPasswordResetTokenEventResponse
    >,
    @Inject(Topic.CORE_USER_REMOVE_PASSWORD_RESET_TOKEN)
    private readonly removePasswordResetTokenServiceBusClient: AzureServiceBusClient<
      RemovePasswordResetTokenEvent,
      RemovePasswordResetTokenEventResponse
    >,
    @Inject(Topic.CORE_USER_SET_PASSWORD_RESET_TOKEN)
    private readonly setPasswordResetTokenServiceBusClient: AzureServiceBusClient<
      SetPasswordResetTokenEvent,
      SetPasswordResetTokenEventResponse
    >,
    @Inject(Topic.USER_PASSWORD_RESET_REQUESTED)
    private readonly userPasswordResetRequestedServiceBusClient: AzureServiceBusClient<UserPasswordResetRequestedEvent>,
    @Inject(Topic.USER_PASSWORD_CHANGED)
    private readonly userPasswordChangedServiceBusClient: AzureServiceBusClient<UserPasswordChangedEvent>
  ) {}

  async initiatePasswordReset(email: string) {
    await this.legacyUserService.migrateLegacyUserWithoutPassword(email);

    const passwordResetToken = crypto.randomBytes(32).toString('hex');

    // Set password reset token in user.
    const success = await this.setPasswordResetToken(email, passwordResetToken);

    // Send email to user.
    if (success) await this.sendPasswordResetEmail(email, passwordResetToken);

    return { success: true };
  }

  async setPasswordResetToken(
    email: string,
    passwordResetToken: string
  ): Promise<boolean> {
    // Ask core service to set password reset token.
    const body = {
      email,
      passwordResetToken,
    };

    const response =
      await this.setPasswordResetTokenServiceBusClient.sendAndReceive({
        payload: {
          body,
        },
      });

    if (!response?.body) {
      throw new Error('Did not receive response from core service');
    }

    // Check for errors except USER_NOT_FOUND.
    if (!response.body.success) {
      if (response.body.errorType === 'USER_NOT_FOUND') {
        return false;
      }

      throw new Error('Unknown error');
    }

    return true;
  }

  async sendPasswordResetEmail(email: string, passwordResetToken: string) {
    const user = await this.getUserByEmailService.getUserByEmail(email);

    try {
      const options = {};
      const body: UserPasswordResetRequestedEvent = {
        owner: {
          email,
          id: user.id,
          firstName: user.firstName,
          settings: user.settings,
        },
        passwordResetToken,
      };
      await this.userPasswordResetRequestedServiceBusClient.emit({
        payload: {
          body,
        },
        options,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send password reset email');
    }
  }

  async resetPassword(passwordResetToken: string, newPassword: string) {
    // Get user email by password reset token.
    const email = await this.getUserEmailByPasswordResetToken(
      passwordResetToken
    );

    // Confirm user in firebase.
    const userAuth = this.firebaseService.getAdminAuth();
    let user: firebaseAdmin.auth.UserRecord;
    try {
      user = await userAuth.getUserByEmail(email);
      await userAuth.updateUser(user.uid, {
        password: newPassword,
      });

      const coreUser = await this.getUserByEmailService.getUserByEmail(email);

      await this.userPasswordChangedServiceBusClient.emit({
        payload: {
          body: {
            owner: {
              id: coreUser.id,
              email,
              firstName: coreUser.firstName,
              settings: coreUser.settings,
            },
          },
        },
        options: {},
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to reset password');
    }

    // Remove password reset token.
    await this.removePasswordResetToken(email);

    // Generate tokens
    const token = await userAuth.createCustomToken(user.uid);

    // Return token.
    return { token };
  }

  async getUserEmailByPasswordResetToken(
    passwordResetToken: string
  ): Promise<string> {
    // Ask core service to get user by password reset token.
    const body = {
      passwordResetToken,
    };

    const response =
      await this.getPasswordResetTokenServiceBusClient.sendAndReceive({
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
      if (response.body.errorType === 'TOKEN_INVALID') {
        throw new Error('Token invalid');
      } else {
        throw new Error('Unknown error');
      }
    }

    return response.body.email;
  }

  async removePasswordResetToken(email: string) {
    // Ask core service to remove password reset token.
    const body: RemovePasswordResetTokenEvent = {
      email,
    };

    const removeResponse =
      await this.removePasswordResetTokenServiceBusClient.sendAndReceive({
        payload: {
          body,
        },
      });

    if (!removeResponse?.body) {
      throw new Error(
        'Did not receive response from core service while removing password reset token'
      );
    }

    if (!removeResponse.body.success) {
      throw new Error('Failed to remove password reset token');
    }
  }
}
