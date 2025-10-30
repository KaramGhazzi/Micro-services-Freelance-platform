"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const envalid_1 = require("envalid");
const pipeline_1 = require("@package/pipeline");
const app_module_1 = require("./app.module");
async function bootstrap() {
    (0, envalid_1.cleanEnv)(process.env, {
        STRIPE_API_KEY: (0, envalid_1.str)(),
        STRIPE_ENDPOINT_SECRET: (0, envalid_1.str)(),
        AZURE_SERVICE_BUS_SUBSCRIPTION: (0, envalid_1.str)(),
        AZURE_SERVICE_BUS_CONNECTION_STRING: (0, envalid_1.str)(),
        REDIS_HOST_WEBHOOK: (0, envalid_1.str)(),
        REDIS_PASSWORD_WEBHOOK: (0, envalid_1.str)(),
        LAUNCH_DARKLY_SDK_KEY: (0, envalid_1.str)(),
        LAUNCH_DARKLY_ACCESS_TOKEN: (0, envalid_1.str)(),
        LAUNCH_DARKLY_ENVIRONMENT_KEY: (0, envalid_1.str)(),
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: (process.env.LOG_LEVELS?.split(',') ?? [
            'log',
            'error',
            'warn',
        ]),
        rawBody: true,
    });
    app.useGlobalPipes(new pipeline_1.XssHtmlPipeline());
    await app.listen(process.env.PORT || 3008);
    common_1.Logger.log(`Application is running on: ${await app.getUrl()}`, '🚀');
    if (process.env.NODE_ENV !== 'production') {
        common_1.Logger.log(`Webhooks are running on: ${await app.getUrl()}/webhook`, '📈');
    }
}
bootstrap();
//# sourceMappingURL=main.js.map