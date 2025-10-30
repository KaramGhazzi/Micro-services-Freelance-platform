import { Injectable, Inject, Logger } from '@nestjs/common';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { ChangeFirebaseEmailUserEvent } from '@package/types';
import { User } from '@package/types/dist/class-validator';
import { LoginService } from '../login/login.service';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class EmailChangeService {
  constructor(
    private readonly loginService: LoginService,
    private readonly firebaseService: FirebaseService,
    @Inject(Topic.CORE_USER_CHANGE_EMAIL_VERIFY)
    private readonly userEmailChangeVerifyServiceBusClient: AzureServiceBusClient<
      ChangeFirebaseEmailUserEvent,
      User
    >,
    @Inject(Topic.CORE_USER_CHANGE_EMAIL_COMPLETE)
    private readonly userEmailChangeCompleteServiceBusClient: AzureServiceBusClient<ChangeFirebaseEmailUserEvent>
  ) {}

  checkEmailChange = async (token: string) => {
    Logger.debug(
      `Checking for token ${token} to change password`,
      EmailChangeService.name
    );

    const user =
      await this.userEmailChangeVerifyServiceBusClient.sendAndReceive({
        payload: {
          body: {
            token,
          },
        },
      });

    if (!user) {
      return {
        success: false,
      };
    }

    Logger.debug(
      `Found user ${JSON.stringify(user.body)} for token ${token}`,
      EmailChangeService.name
    );

    return { success: true };
  };

  verifyEmailChange = async (token: string, password: string) => {
    Logger.debug(
      `Verify email change using token ${token}`,
      `${EmailChangeService.name} - verifyEmailChange`
    );

    const user =
      await this.userEmailChangeVerifyServiceBusClient.sendAndReceive({
        payload: {
          body: {
            token,
          },
        },
      });

    if (!user) {
      return {
        success: false,
      };
    }

    const { email, emailChange } = user.body;
    Logger.debug(
      `Found user ${email} to change to ${emailChange}`,
      EmailChangeService.name
    );

    let loginResponse;
    try {
      // To be able to change the email in firebase we first need to login again
      let fireBaseUser = await this.loginService.migrateOrLogin(
        email,
        password
      );

      // To prevent the error: FirebaseError: "Firebase: Please verify the new email before changing email. (auth/operation-not-allowed).", disable email enumeration in firebase.
      await this.firebaseService.getAdminAuth().updateUser(fireBaseUser.uid, {
        email: emailChange,
      });
      Logger.debug(
        `updated mail in firebase ${email} for token ${token}`,
        EmailChangeService.name
      );

      // Wait for the change to be done, otherwise migrateOrLogin with the new email address will fail
      await this.userEmailChangeCompleteServiceBusClient.sendAndReceive({
        payload: {
          body: {
            token,
            emailChange,
          },
        },
      });

      fireBaseUser = await this.loginService.migrateOrLogin(
        emailChange,
        password
      );

      loginResponse =
        this.loginService.generateCacheAndLoginResponse(fireBaseUser);
    } catch (error) {
      await this.loginService.handleAuthenticationErrors(email, error);

      throw new Error('unknownError');
    }

    return loginResponse ?? { success: false };
  };
}
