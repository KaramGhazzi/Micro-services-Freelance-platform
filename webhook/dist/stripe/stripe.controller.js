"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StripeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const azure_service_bus_1 = require("@package/azure-service-bus");
const stripe_1 = require("stripe");
const webhook_cache_service_1 = require("../webhook-cache.service");
const EventType = {
    INVOICE_PAID: 'invoice.paid',
    SUBSCRIPTION_CREATED: 'customer.subscription.created',
    SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
    SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
    SUBSCRIPTION_SCHEDULE_CREATED: 'customer.subscription_schedule.created',
    SUBSCRIPTION_SCHEDULE_DELETED: 'customer.subscription_schedule.deleted',
    PAYMENT_SUCCEEDED: 'payment_intent.succeeded',
    PAYMENT_FAILED: 'payment_intent.payment_failed',
    PAYMENT_CANCELED: 'payment_intent.canceled',
};
let StripeController = StripeController_1 = class StripeController {
    constructor(configService, webhookCacheService, stripe, subscriptionCreatedServiceBusClient, subscriptionDeletedServiceBusClient, subscriptionUpdatedServiceBusClient, subscriptionScheduleCreatedServiceBusClient, paymentSucceededServiceBusClient, paymentFailedServiceBusClient, paymentCanceledServiceBusClient, invoicePaidServiceBusClient) {
        this.configService = configService;
        this.webhookCacheService = webhookCacheService;
        this.stripe = stripe;
        this.subscriptionCreatedServiceBusClient = subscriptionCreatedServiceBusClient;
        this.subscriptionDeletedServiceBusClient = subscriptionDeletedServiceBusClient;
        this.subscriptionUpdatedServiceBusClient = subscriptionUpdatedServiceBusClient;
        this.subscriptionScheduleCreatedServiceBusClient = subscriptionScheduleCreatedServiceBusClient;
        this.paymentSucceededServiceBusClient = paymentSucceededServiceBusClient;
        this.paymentFailedServiceBusClient = paymentFailedServiceBusClient;
        this.paymentCanceledServiceBusClient = paymentCanceledServiceBusClient;
        this.invoicePaidServiceBusClient = invoicePaidServiceBusClient;
        this.logger = new common_1.Logger(StripeController_1.name);
        this.eventHandlers = {
            [EventType.SUBSCRIPTION_CREATED]: (event) => {
                if (this.isEventType(event, EventType.SUBSCRIPTION_CREATED)) {
                    return this.handleSubscriptionCreated(event);
                }
            },
            [EventType.SUBSCRIPTION_DELETED]: (event) => {
                if (this.isEventType(event, EventType.SUBSCRIPTION_DELETED)) {
                    return this.handleSubscriptionDeleted(event);
                }
            },
            [EventType.SUBSCRIPTION_UPDATED]: (event) => {
                if (this.isEventType(event, EventType.SUBSCRIPTION_UPDATED)) {
                    return this.handleSubscriptionUpdated(event);
                }
            },
            [EventType.SUBSCRIPTION_SCHEDULE_CREATED]: (event) => {
                if (this.isEventType(event, EventType.SUBSCRIPTION_SCHEDULE_CREATED)) {
                    return this.handleSubscriptionScheduleCreated(event);
                }
            },
            [EventType.PAYMENT_SUCCEEDED]: (event) => {
                if (this.isEventType(event, EventType.PAYMENT_SUCCEEDED)) {
                    return this.handlePaymentSucceeded(event);
                }
            },
            [EventType.PAYMENT_FAILED]: (event) => {
                if (this.isEventType(event, EventType.PAYMENT_FAILED)) {
                    return this.handlePaymentFailed(event);
                }
            },
            [EventType.PAYMENT_CANCELED]: (event) => {
                if (this.isEventType(event, EventType.PAYMENT_CANCELED)) {
                    return this.handlePaymentCanceled(event);
                }
            },
            [EventType.INVOICE_PAID]: (event) => {
                if (this.isEventType(event, EventType.INVOICE_PAID)) {
                    return this.handleInvoicePaid(event);
                }
            },
        };
        this.endpointSecret = this.configService.get('STRIPE_ENDPOINT_SECRET');
    }
    async handleWebhook(signature, request) {
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(request.rawBody, signature, this.endpointSecret);
        }
        catch (err) {
            const message = `Webhook Error: ${err.message}`;
            this.logger.error(message);
            throw new common_1.BadRequestException(message);
        }
        if (!event?.data?.object) {
            this.logger.error('Webhook contains no object', request.rawBody);
            throw new common_1.BadRequestException('Invalid event data');
        }
        if (!Object.values(EventType).includes(event.type)) {
            const message = `Unhandled event type ${event?.type}`;
            this.logger.warn(message);
            return message;
        }
        if (await this.webhookCacheService.get(event.id)) {
            return `Webhook ${event.type} with id ${event.id} already processed`;
        }
        await this.webhookCacheService.set(event.id);
        try {
            await this.processEvent(event);
            this.logger.debug(`Processed ${event.type} event: ${JSON.stringify(event.data.object)}`);
        }
        catch (error) {
            this.logger.error(`Error processing event ${event.type}: ${error.message}`, error.stack);
            throw new common_1.BadRequestException('Error processing webhook');
        }
        return 'Webhook received successfully';
    }
    isEventType(event, type) {
        return event.type === type;
    }
    async processEvent(event) {
        const handler = this.eventHandlers[event.type];
        if (handler) {
            await handler(event);
        }
        else {
            this.logger.warn(`No handler found for event type: ${event.type}`);
        }
    }
    async handleSubscriptionCreated(event) {
        const object = event.data.object;
        await this.subscriptionCreatedServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
    async handleSubscriptionDeleted(event) {
        const object = event.data.object;
        await this.subscriptionDeletedServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
    async handleSubscriptionUpdated(event) {
        const object = event.data.object;
        await this.subscriptionUpdatedServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
    async handleSubscriptionScheduleCreated(event) {
        const object = event.data.object;
        await this.subscriptionScheduleCreatedServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
    async handlePaymentSucceeded(event) {
        const object = event.data.object;
        await this.paymentSucceededServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
    async handlePaymentFailed(event) {
        const object = event.data.object;
        await this.paymentFailedServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
    async handlePaymentCanceled(event) {
        const object = event.data.object;
        await this.paymentCanceledServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
    async handleInvoicePaid(event) {
        const object = event.data.object;
        await this.invoicePaidServiceBusClient.emit({
            payload: { body: object },
            options: {},
        });
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.Post)('/stripe'),
    __param(0, (0, common_1.Headers)('stripe-signature')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "handleWebhook", null);
exports.StripeController = StripeController = StripeController_1 = __decorate([
    (0, common_1.Controller)('webhook'),
    __param(2, (0, common_1.Inject)('STRIPE_SERVICE')),
    __param(3, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_CREATED)),
    __param(4, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_DELETED)),
    __param(5, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_UPDATED)),
    __param(6, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_SUBSCRIPTION_SCHEDULE_CREATED)),
    __param(7, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_PAYMENT_SUCCEEDED)),
    __param(8, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_PAYMENT_FAILED)),
    __param(9, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_PAYMENT_CANCELED)),
    __param(10, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_INVOICE_PAID)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        webhook_cache_service_1.WebhookCacheService,
        stripe_1.Stripe,
        azure_service_bus_1.AzureServiceBusClient,
        azure_service_bus_1.AzureServiceBusClient,
        azure_service_bus_1.AzureServiceBusClient,
        azure_service_bus_1.AzureServiceBusClient,
        azure_service_bus_1.AzureServiceBusClient,
        azure_service_bus_1.AzureServiceBusClient,
        azure_service_bus_1.AzureServiceBusClient,
        azure_service_bus_1.AzureServiceBusClient])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map