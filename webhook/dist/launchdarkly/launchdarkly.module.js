"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchDarklyModule = void 0;
const common_1 = require("@nestjs/common");
const feature_flag_1 = require("@package/feature-flag");
const launchdarkly_service_1 = require("./launchdarkly.service");
const launchdarkly_controller_1 = require("./launchdarkly.controller");
let LaunchDarklyModule = class LaunchDarklyModule {
};
exports.LaunchDarklyModule = LaunchDarklyModule;
exports.LaunchDarklyModule = LaunchDarklyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            feature_flag_1.FeatureFlagModule.forRoot({
                sdkKey: process.env.LAUNCH_DARKLY_SDK_KEY,
                id: 'webhook',
            }),
        ],
        providers: [launchdarkly_service_1.LaunchDarklyService],
        controllers: [launchdarkly_controller_1.LaunchDarklyController],
    })
], LaunchDarklyModule);
//# sourceMappingURL=launchdarkly.module.js.map