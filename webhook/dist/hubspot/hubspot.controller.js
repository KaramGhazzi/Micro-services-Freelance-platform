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
var HubspotController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubspotController = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const azure_service_bus_1 = require("@package/azure-service-bus");
const types_1 = require("@package/types");
let HubspotController = HubspotController_1 = class HubspotController {
    constructor(configService, emailUnsubscribeServiceBusClient) {
        this.configService = configService;
        this.emailUnsubscribeServiceBusClient = emailUnsubscribeServiceBusClient;
        this.logger = new common_1.Logger(HubspotController_1.name);
        this.hashAlgorithm = 'sha256';
        this.endpointSecret = this.configService.get('HUBSPOT_ENDPOINT_SECRET');
    }
    async handleWebhook(headers, request) {
        const timestamp = Number(headers['x-hubspot-request-timestamp']);
        const time = new Date();
        const fiveMinutes = 300000;
        if (time.getTime() - timestamp >= fiveMinutes) {
            this.logger.error('Webhook received request that was too old');
            throw new common_1.BadRequestException();
        }
        const rawBody = request.rawBody;
        const signature = Buffer.from(headers['x-hubspot-signature-v3'] || '', 'utf-8');
        const host = headers['host'];
        const url = `https://${host}${request.url}`;
        const hmac = crypto.createHmac(this.hashAlgorithm, this.endpointSecret);
        const source = `POST${url}${rawBody}${timestamp}`;
        const digest = Buffer.from(hmac.update(source).digest('base64'));
        console.log('digest', digest.toString());
        const isAllowed = signature.length === digest.length &&
            crypto.timingSafeEqual(digest, signature);
        if (!isAllowed) {
            throw new common_1.UnauthorizedException('Someone is doing something nasty');
        }
        let event = JSON.parse(rawBody.toString());
        if (!event) {
            const message = `Webhook empty event Error`;
            this.logger.error(message);
            throw new common_1.BadRequestException(message);
        }
        if (!Object.values(types_1.EmailUnsubscribeType).includes(event.type)) {
            const message = `Unhandled event type ${event?.type}`;
            this.logger.error(message);
            return message;
        }
        this.handleEmailUnsubscribe(event);
        return 'Webhook received successfully';
    }
    async handleEmailUnsubscribe(event) {
        if (!event?.userId) {
            return;
        }
        const payload = {
            body: {
                ...event,
            },
        };
        await this.emailUnsubscribeServiceBusClient.emit({
            payload,
            options: {},
        });
    }
};
exports.HubspotController = HubspotController;
__decorate([
    (0, common_1.Post)('/hubspot'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HubspotController.prototype, "handleWebhook", null);
exports.HubspotController = HubspotController = HubspotController_1 = __decorate([
    (0, common_1.Controller)('webhook'),
    __param(1, (0, common_1.Inject)(azure_service_bus_1.Topic.WEBHOOK_EMAIL_UNSUBSCRIBE)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        azure_service_bus_1.AzureServiceBusClient])
], HubspotController);
//# sourceMappingURL=hubspot.controller.js.map