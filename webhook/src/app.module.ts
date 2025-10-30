import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleRef, APP_INTERCEPTOR } from '@nestjs/core';
import {
  AzureServiceBusMode,
  AzureServiceBusModule,
  Topic,
  getMultipleServiceBussesByTopics,
} from '@package/azure-service-bus';
import { SentryModule, GraphqlInterceptor } from '@ntegral/nestjs-sentry';
import { StripeController } from './stripe/stripe.controller';
import { HubspotController } from './hubspot/hubspot.controller';
import { HealthController } from './health.controller';
import { WebhookCacheService } from './webhook-cache.service';
import { StripeModule } from './stripe/stripe.module';
import { HubspotModule } from './hubspot/hubspot.module';
import { LaunchDarklyModule } from './launchdarkly/launchdarkly.module';

@Module({
  providers: [
    WebhookCacheService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AzureServiceBusModule.forRootAsync([
      ...getMultipleServiceBussesByTopics(
        AzureServiceBusMode.SENDER,
        [
          Topic.WEBHOOK_SUBSCRIPTION_CREATED,
          Topic.WEBHOOK_SUBSCRIPTION_DELETED,
          Topic.WEBHOOK_SUBSCRIPTION_UPDATED,
          Topic.WEBHOOK_SUBSCRIPTION_SCHEDULE_CREATED,
          Topic.WEBHOOK_PAYMENT_SUCCEEDED,
          Topic.WEBHOOK_PAYMENT_FAILED,
          Topic.WEBHOOK_PAYMENT_CANCELED,
          Topic.WEBHOOK_EMAIL_UNSUBSCRIBE,
          Topic.WEBHOOK_INVOICE_PAID,
        ],
        [ConfigService, ModuleRef]
      ),
    ]),

    StripeModule,
    HubspotModule,
    LaunchDarklyModule,
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
  ],
  controllers: [StripeController, HubspotController, HealthController],
})
export class AppModule {}
