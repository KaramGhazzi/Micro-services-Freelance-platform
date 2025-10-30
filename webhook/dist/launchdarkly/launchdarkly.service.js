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
var LaunchDarklyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchDarklyService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
let LaunchDarklyService = LaunchDarklyService_1 = class LaunchDarklyService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(LaunchDarklyService_1.name);
    }
    async updateFlag(flagKey, action, comment) {
        const accessToken = this.configService.get('LAUNCH_DARKLY_ACCESS_TOKEN');
        const environmentKey = this.configService.get('LAUNCH_DARKLY_ENVIRONMENT_KEY');
        const url = `https://app.launchdarkly.com/api/v2/flags/default/${flagKey}?ignoreConflicts=true`;
        const patchData = {
            comment,
            environmentKey: environmentKey,
            instructions: [
                {
                    kind: action,
                },
            ],
        };
        try {
            this.logger.log(`Webhook LaunchDarkly: Attempting to switch feature flag '${flagKey}' to '${action}'`);
            await axios_1.default.patch(url, patchData, {
                headers: {
                    Authorization: accessToken,
                    'content-type': 'application/json; domain-model=launchdarkly.semanticpatch',
                },
            });
        }
        catch (e) {
            this.logger.error('Webhook LaunchDarkly: An error occured updating feature flag', e);
            if (axios_1.default.isAxiosError(e)) {
                throw new common_1.HttpException(e.response?.data.message, e.response.status, {
                    cause: { code: e.response.data.code },
                });
            }
            throw e;
        }
        this.logger.log(`Webhook LaunchDarkly: Succesfully switched feature flag '${flagKey}' to '${action}'`);
        return {
            data: {
                flagKey,
                action,
                comment,
            },
        };
    }
};
exports.LaunchDarklyService = LaunchDarklyService;
exports.LaunchDarklyService = LaunchDarklyService = LaunchDarklyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LaunchDarklyService);
//# sourceMappingURL=launchdarkly.service.js.map