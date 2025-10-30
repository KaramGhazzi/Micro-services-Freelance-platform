import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModuleRef, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { getApolloConfig, HealthResolver } from '@package/general';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AzureServiceBusModule,
  Topic,
  AzureServiceBusMode,
  getMultipleServiceBussesByTopics,
} from '@package/azure-service-bus';
import { CustomPrismaModule } from 'nestjs-prisma';
import { PrismaClient } from '@freelance/contract/client';
import {
  AuthorizationModule,
  AuthorizationGuard,
  UserMiddleware,
  UserIsAdminOrPartOfCompanyGuard,
} from '@package/authorization';
import { SentryModule, GraphqlInterceptor } from '@ntegral/nestjs-sentry';

import { ScheduleModule } from '@nestjs/schedule';
import { SubscriptionModule } from './subscription/subscription.module';
import { StripeModule } from './stripe/stripe.module';
import { ExternalProviderCompanyModule } from './external-provider-company/external-provider-company.module';
import { UsageModule } from './usage/usage.module';
import { ContractModule } from './contract/contract.module';
import { PlanModule } from './plan/plan.module';
import { ProductModule } from './product/product.module';
import { CheckoutModule } from './checkout/checkout.module';
import { InvoiceModule } from './invoice/invoice.module';
import { Company } from './company/company.entity';
import { CompanyModule } from './company/company.module';
import { PaymentModule } from './payment/payment.module';
import { CheckoutInvoiceModule } from './checkout-invoice/checkout-invoice.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    getApolloConfig({
      buildSchemaOptions: {
        orphanedTypes: [Company],
      },
    }),
    CustomPrismaModule.forRoot({
      name: 'PrismaServiceContract',
      client: new PrismaClient(),
      isGlobal: true,
    }),
    AzureServiceBusModule.forRootAsync([
      ...getMultipleServiceBussesByTopics(
        AzureServiceBusMode.RECEIVER,
        [
          Topic.COMPANY_REGISTERED,
          Topic.COMPANY_UPDATED,
          Topic.COMPANY_TYPE_UPDATED,
          Topic.ASSIGNMENT_PENDING_REVIEW,
          Topic.ASSIGNMENT_APPLICATION_CREATED,
          Topic.CONTRACT_GET_CREDITS,
          Topic.CONTRACT_GET_OBJECT_CREDITS,
          Topic.WEBHOOK_SUBSCRIPTION_DELETED,
          Topic.WEBHOOK_SUBSCRIPTION_UPDATED,
          Topic.WEBHOOK_PAYMENT_SUCCEEDED,
          Topic.WEBHOOK_PAYMENT_FAILED,
          Topic.WEBHOOK_PAYMENT_CANCELED,
          Topic.WEBHOOK_INVOICE_PAID,
          Topic.CONTRACT_SUBSCRIPTION_GET_BY_COMPANY,
          Topic.ASSIGNMENT_DECLINED,
          Topic.ASSIGNMENT_VIEWED,
          Topic.CORE_COMPANY_GET_BY_ID,
        ],
        [ConfigService, ModuleRef]
      ),
      ...getMultipleServiceBussesByTopics(
        AzureServiceBusMode.SENDER,
        [Topic.CORE_COMPANY_GET_BY_ID, Topic.CONTRACT_UPDATED],
        [ConfigService, ModuleRef]
      ),
    ]),
    CheckoutModule,
    ExternalProviderCompanyModule,
    ContractModule,
    PlanModule,
    ProductModule,
    StripeModule,
    SubscriptionModule,
    UsageModule,
    AuthorizationModule,
    InvoiceModule,
    CompanyModule,
    PaymentModule,
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
    ScheduleModule.forRoot(),
    CheckoutInvoiceModule,
  ],
  providers: [
    AuthorizationGuard,
    UserIsAdminOrPartOfCompanyGuard,
    HealthResolver,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
    {
      provide: APP_GUARD,
      useExisting: AuthorizationGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
