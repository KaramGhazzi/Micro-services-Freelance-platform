"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const webhook_cache_service_1 = require("../webhook-cache.service");
const stripe_controller_1 = require("./stripe.controller");
let StripeModule = class StripeModule {
};
exports.StripeModule = StripeModule;
exports.StripeModule = StripeModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: 'STRIPE_SERVICE',
                useFactory: (configService) => new stripe_1.default(configService.get('STRIPE_API_KEY'), {
                    apiVersion: configService.get('STRIPE_API_VERSION') ?? '2023-08-16',
                }),
                inject: [config_1.ConfigService],
            },
            webhook_cache_service_1.WebhookCacheService,
        ],
        controllers: [stripe_controller_1.StripeController],
        exports: ['STRIPE_SERVICE'],
    })
], StripeModule);
//# sourceMappingURL=stripe.module.js.map