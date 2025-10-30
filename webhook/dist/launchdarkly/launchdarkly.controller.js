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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchDarklyController = void 0;
const common_1 = require("@nestjs/common");
const launchdarkly_service_1 = require("./launchdarkly.service");
const flag_actions_1 = require("./flag-actions");
let LaunchDarklyController = class LaunchDarklyController {
    constructor(featureFlagsService) {
        this.featureFlagsService = featureFlagsService;
    }
    async updateFeatureFlag(flagKey, action) {
        return this.featureFlagsService.updateFlag(flagKey, action, 'Automatically switched by the webhook service.');
    }
};
exports.LaunchDarklyController = LaunchDarklyController;
__decorate([
    (0, common_1.Get)('feature-flags/:flagKey/:action'),
    __param(0, (0, common_1.Param)('flagKey')),
    __param(1, (0, common_1.Param)('action', new common_1.ParseEnumPipe(flag_actions_1.FlagActions))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LaunchDarklyController.prototype, "updateFeatureFlag", null);
exports.LaunchDarklyController = LaunchDarklyController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [launchdarkly_service_1.LaunchDarklyService])
], LaunchDarklyController);
//# sourceMappingURL=launchdarkly.controller.js.map