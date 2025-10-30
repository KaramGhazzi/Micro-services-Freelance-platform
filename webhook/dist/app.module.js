"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const azure_service_bus_1 = require("@package/azure-service-bus");
const nestjs_sentry_1 = require("@ntegral/nestjs-sentry");
const stripe_controller_1 = require("./stripe/stripe.controller");
const hubspot_controller_1 = require("./hubspot/hubspot.controller");
const health_controller_1 = require("./health.controller");
const webhook_cache_service_1 = require("./webhook-cache.service");
const stripe_module_1 = require("./stripe/stripe.module");
const hubspot_module_1 = require("./hubspot/hubspot.module");
const launchdarkly_module_1 = require("./launchdarkly/launchdarkly.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [
            webhook_cache_service_1.WebhookCacheService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useFactory: () => new nestjs_sentry_1.GraphqlInterceptor(),
            },
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            azure_service_bus_1.AzureServiceBusModule.forRootAsync([
                ...(0, azure_service_bus_1.getMultipleServiceBussesByTopics)(azure_service_bus_1.AzureServiceBusMode.SENDER, [
                    azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_CREATED,
                    azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_DELETED,
                    azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_UPDATED,
                    azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_SCHEDULE_CREATED,
                    azure_service_bus_1.Topic.WEBHOOK_PAYMENT_SUCCEEDED,
                    azure_service_bus_1.Topic.WEBHOOK_PAYMENT_FAILED,
                    azure_service_bus_1.Topic.WEBHOOK_PAYMENT_CANCELED,
                    azure_service_bus_1.Topic.WEBHOOK_EMAIL_UNSUBSCRIBE,
                    azure_service_bus_1.Topic.WEBHOOK_INVOICE_PAID,
                ], [config_1.ConfigService, core_1.ModuleRef]),
            ]),
            stripe_module_1.StripeModule,
            hubspot_module_1.HubspotModule,
            launchdarkly_module_1.LaunchDarklyModule,
            nestjs_sentry_1.SentryModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (cfg) => ({
                    dsn: cfg.get('SENTRY_DSN'),
                    debug: cfg.get('SENTRY_DEBUG') === 'true',
                    environment: cfg.get('DEPLOYED_ENVIRONMENT'),
                    release: cfg.get('SENTRY_RELEASE'),
                    logLevels: ['debug'],
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [stripe_controller_1.StripeController, hubspot_controller_1.HubspotController, health_controller_1.HealthController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map