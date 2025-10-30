/* eslint-disable class-methods-use-this */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import {
  AuthorizationCacheService,
  CacheCategory,
} from '@package/authorization';
import { permissionsForCompanyRoles } from '@package/permission';
import { User } from '@package/types/dist/class-validator/@generated/models';
import {
  SubscriptionGetByCompanyEvent,
  SubscriptionGetByCompanyEventResponse,
  SubscriptionType,
} from '@package/types';
import {
  AuthErrorCodes,
  signInWithCustomToken,
  User as FireBaseUser,
} from 'firebase/auth';
import { PrivateCompanyInfo } from '@package/authorization/dist/types/private-company-info';
import { GetUserByEmailService } from '@package/general';
import { GraphQlClient } from '@package/m2m';
import { PermissionsByCompanyId } from '../../types/graphql/permission/permissions-by-company-id';
import { LoginOutput } from '../../types/graphql/login/login.output';
import { FirebaseService } from '../firebase/firebase.service';
import { LegacyUserService } from '../legacy-user/legacy-user.service';
import { isUserNotFoundError } from '../firebase/firebase.login.errors';
import { getUserByEmailQuery } from '../graphql/queries/get-user-by-email';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly getUserByEmailService: GetUserByEmailService,
    @Inject(Topic.CONTRACT_SUBSCRIPTION_GET_BY_COMPANY)
    private readonly getContractSubscriptionServiceBusClient: AzureServiceBusClient<
      SubscriptionGetByCompanyEvent,
      SubscriptionGetByCompanyEventResponse
    >,
    private readonly legacyUserService: LegacyUserService,
    private readonly authorizationCacheService: AuthorizationCacheService,
    private readonly apolloClient: GraphQlClient
  ) {}

  async authenticateThroughFirebase(
    email: string,
    password: string
  ): Promise<LoginOutput> {
    try {
      const fireBaseUser = await this.migrateOrLogin(email, password);

      return this.generateCacheAndLoginResponse(fireBaseUser);
    } catch (error) {
      await this.handleAuthenticationErrors(email, error);
      throw new Error('unknownError');
    }
  }

  async migrateOrLogin(email: string, password: string): Promise<FireBaseUser> {
    return this.signInWithFirebase(email, password).catch(async (err) => {
      if (isUserNotFoundError(err)) {
        await this.migrateWithPassword(email, password);
        return this.signInWithFirebase(email, password);
      }
      throw err;
    });
  }

  public async signInWithFirebase(
    email: string,
    password: string
  ): Promise<FireBaseUser> {
    const firebaseUser = (
      await this.firebaseService.signInWithEmailAndPassword(
        this.firebaseService.getClientAuth(),
        email,
        password
      )
    )?.user;

    if (!firebaseUser) {
      /*
       * This means that there is no user object in Firebase, that should never happen but since
       * The rest of the code, for now, explicitly checks for certain errors this error message
       * will be used to indicate something is wrong.
       */
      throw new Error('credentialsInvalid'); // TODO: change error type when the rest of the refactoring is done.
    }
    return firebaseUser;
  }

  public async migrateWithPassword(
    email: string,
    password: string
  ): Promise<void> {
    return this.legacyUserService.migrateLegacyUserWithPassword(
      email,
      password
    );
  }

  async handleAuthenticationErrors(email: string, error: { code; message }) {
    // almost all errors here are related to the credentials
    this.logger.debug(`login error: ${email}`, error);

    const invalidCredentialsErrors = new Set([
      'auth/user-not-found',
      'auth/wrong-password',
      'auth/invalid-credential',
      'auth/invalid-login-credentials',
      'auth/invalid-email',
    ]);

    if (
      invalidCredentialsErrors.has(error.code) ||
      error.message === 'credentialsInvalid'
    ) {
      throw new Error('credentialsInvalid');
    }

    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
      throw new Error('emailFormatInvalid');
    }

    if (error.code === 'auth/too-many-requests') {
      throw new Error('tooManyRequests');
    }
  }

  public async generateCacheAndLoginResponse(
    firebaseUser: FireBaseUser
  ): Promise<LoginOutput> {
    const { data: user } = await this.apolloClient.query<User>({
      query: getUserByEmailQuery,
      variables: { email: firebaseUser.email },
    });

    if (!user.firebaseUid || user.firebaseUid !== firebaseUser.uid) {
      throw new Error('credentialsInvalid');
    }

    // Prepare the cache
    await this.prepareSessionData(user, firebaseUser);
    const permissionsByCompany = this.groupUserPermissionsByCompany(
      user.userCompanies
    );

    // return the response.
    return {
      idToken: await firebaseUser.getIdToken(true), // Needs to be refreshed to get the custom claims
      refreshToken: firebaseUser.refreshToken,
      permissionsByCompany,
    };
  }

  private async getSubscriptionsForCompanyId(
    companyId: number
  ): Promise<SubscriptionType[]> {
    const message = { payload: { body: { companyId } } };
    const response =
      await this.getContractSubscriptionServiceBusClient.sendAndReceive(
        message
      );

    if (response?.body?.error && response?.body?.error !== 'no-subscriptions') {
      throw new Error(response.body.error);
    }

    if (!response?.body?.success) {
      return [];
    }

    return response?.body?.subscriptions ?? [];
  }

  async prepareSessionData(user: User, fireBaseUser?: FireBaseUser) {
    // Prepare the cache.
    await this.cacheAuthData(user);

    // Save the role as a custom claim.
    await this.firebaseService
      .getAdminAuth()
      .setCustomUserClaims(fireBaseUser.uid, {
        role: user.role,
      });
  }

  async cacheAuthData(user: User) {
    // Save user in cache
    const { firebaseUid } = user;

    const promises = user.userCompanies.map(async (userCompany) => {
      const { companyId } = userCompany;

      // Get the user's subscriptions.
      const subscriptions = await this.getSubscriptionsForCompanyId(companyId);

      const companyInfo = {
        ...userCompany,
        subscriptions,
      } as unknown as PrivateCompanyInfo;

      return this.authorizationCacheService.set(
        CacheCategory.COMPANY,
        companyId.toString(),
        companyInfo
      );
    });

    promises.push(
      this.authorizationCacheService.set(CacheCategory.USER, firebaseUid, user)
    );

    await Promise.all(promises);
  }

  groupUserPermissionsByCompany(
    userCompanies: User['userCompanies']
  ): PermissionsByCompanyId[] {
    return userCompanies.map((userCompany) => {
      const roles = userCompany.userCompanyRoles.map(({ role }) => role);

      return {
        companyId: userCompany.companyId,
        permissions: permissionsForCompanyRoles(roles),
      };
    });
  }

  async refresh(token: string) {
    try {
      // Get user id from token. This is the only way to get user session data from a refresh token.
      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${this.firebaseService.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(
            token
          )}`,
        }
      );

      // Because of using fetch, we need to convert the response to JSON.
      // We destructure the user id from the response.
      const { user_id: userId } = await response.json();

      // Get the client and admin auth.
      const clientAuth = this.firebaseService.getClientAuth();
      const auth = this.firebaseService.getAdminAuth();

      // Generate token.
      const customToken = await auth.createCustomToken(userId);

      // Sign in with custom token.
      const { user: firebaseUser } = await signInWithCustomToken(
        clientAuth,
        customToken
      );

      // If the user is not found, throw an error.
      if (!firebaseUser) {
        throw new Error('User not found');
      }

      // Generate cache and return token.
      return this.generateCacheAndLoginResponse(firebaseUser);
    } catch (error) {
      this.logger.error(error);

      throw new Error('unknownError');
    }
  }

  async syncPermissions(email: string): Promise<void> {
    const user = await this.getUserByEmailService.getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }
    await this.cacheAuthData(user);
  }
}
