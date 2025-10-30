import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, ModuleRef, APP_INTERCEPTOR } from '@nestjs/core';
import {
  getApolloConfig,
  GetUserByEmailService,
  HealthResolver,
} from '@package/general';
import {
  AzureServiceBusModule,
  AzureServiceBusMode,
  Topic,
  getMultipleServiceBussesByTopics,
} from '@package/azure-service-bus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthorizationGuard,
  AuthorizationModule,
  UserMiddleware,
} from '@package/authorization';
import { SentryModule, GraphqlInterceptor } from '@ntegral/nestjs-sentry';
import { GraphQlModule } from '@package/m2m';
import { HttpLink, InMemoryCache } from '@apollo/client/core';
import { LoginModule } from './login/login.module';

import { PasswordForgetModule } from './password-forget/password-forget.module';
import { RegisterModule } from './register/register.module';
import { FirebaseModule } from './firebase/firebase.module';
import { PasswordUpdateModule } from './password-update/password-update.module';
import { LegacyUserModule } from './legacy-user/legacy-user.module';
import { InviteModule } from './invite/invite.module';
import { EmailChangeModule } from './email-change/email-change.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    getApolloConfig(),
    AzureServiceBusModule.forRootAsync([
      ...getMultipleServiceBussesByTopics(
        AzureServiceBusMode.SENDER,
        [
          Topic.CORE_USER_CREATE,
          Topic.CORE_USER_INVITE,
          Topic.CORE_USER_CONFIRM,
          Topic.CORE_USER_GET_BY_PASSWORD_RESET_TOKEN,
          Topic.CORE_USER_GET_BY_INVITE_TOKEN,
          Topic.CORE_USER_CHECK_INVITE_TOKEN,
          Topic.CORE_USER_SET_PASSWORD_RESET_TOKEN,
          Topic.CORE_USER_SET_FIREBASE_UID,
          Topic.CORE_USER_REMOVE_PASSWORD_RESET_TOKEN,
          Topic.CORE_USER_REMOVE_INVITE_TOKEN,
          Topic.CORE_USER_GET_MIGRATION_STATUS,
          Topic.CORE_REMOVE_LEGACY_CREDENTIALS,
          Topic.CORE_USER_GET_BY_EMAIL,
          Topic.CONTRACT_SUBSCRIPTION_GET_BY_COMPANY,
          Topic.CORE_USER_SET_PRIVACY_SETTINGS,
          Topic.CORE_USER_CHANGE_EMAIL_VERIFY,
          Topic.CORE_USER_CHANGE_EMAIL_COMPLETE,
          Topic.USER_INVITE_CREATED,
          Topic.USER_PASSWORD_CHANGED,
          Topic.USER_PASSWORD_RESET_REQUESTED,
          Topic.USER_EMAIL_CONFIRMATION_REQUESTED,
        ],
        [ConfigService, ModuleRef]
      ),
      ...getMultipleServiceBussesByTopics(
        AzureServiceBusMode.RECEIVER,
        [Topic.CORE_USER_REMOVE_FROM_FIREBASE, Topic.USER_SYNC_PERMISSIONS],
        [ConfigService, ModuleRef]
      ),
    ]),
    LegacyUserModule,
    LoginModule,
    PasswordForgetModule,
    PasswordUpdateModule,
    RegisterModule,
    InviteModule,
    FirebaseModule,
    UserModule,
    AuthorizationModule,
    EmailChangeModule,
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        dsn: cfg.get('SENTRY_DSN'),
        debug: cfg.get('SENTRY_DEBUG') === 'true',
        environment: cfg.get('DEPLOYED_ENVIRONMENT'),
        release: cfg.get('SENTRY_RELEASE'),
        logLevels: ['debug'],
      }),
      inject: [ConfigService],
    }),
    GraphQlModule.forRoot({
      link: new HttpLink({
        uri: process.env.GRAPHQL_URL,
        headers: { 'x-api-key': process.env.M2M_API_KEY },
      }),
      cache: new InMemoryCache(),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthorizationGuard,
    },
    AuthorizationGuard,
    HealthResolver,
    GetUserByEmailService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
  ],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
