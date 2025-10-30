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
var WebhookCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookCacheService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@redis/client");
const defaultRedisKeyExpire = 3600 * 24 * 3;
let WebhookCacheService = WebhookCacheService_1 = class WebhookCacheService {
    constructor(configService) {
        this.configService = configService;
        this.redisKeyExpire = defaultRedisKeyExpire;
        this.logger = new common_1.Logger(WebhookCacheService_1.name);
        const redisHost = this.configService.get('REDIS_HOST_WEBHOOK');
        const redisPassword = this.configService.get('REDIS_PASSWORD_WEBHOOK');
        this.redisKeyExpire =
            this.configService.get('REDIS_KEY_EXPIRE_WEBHOOK') ??
                defaultRedisKeyExpire;
        if (!redisHost || !redisPassword) {
            this.logger.warn('Error initializing Redis: host or password is not set. Skipping...');
            return;
        }
        this.client = (0, client_1.createClient)({
            url: redisHost,
            password: redisPassword,
        });
        this.client.on('error', (error) => {
            this.logger.error(error);
        });
        this.client.connect().then(() => {
            this.logger.log('Redis connected');
        });
    }
    async set(key) {
        this.logger.debug(`Adding key ${key}`);
        await this.client.set(key, '', { EX: this.redisKeyExpire });
    }
    async get(key) {
        return this.client.get(key);
    }
};
exports.WebhookCacheService = WebhookCacheService;
exports.WebhookCacheService = WebhookCacheService = WebhookCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WebhookCacheService);
//# sourceMappingURL=webhook-cache.service.js.map