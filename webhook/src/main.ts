/* eslint-disable turbo/no-undeclared-env-vars */
import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel } from '@nestjs/common';
import { cleanEnv, str } from 'envalid';
import { XssHtmlPipeline } from '@package/pipeline';
import { AppModule } from './app.module';

async function bootstrap() {
  cleanEnv(process.env, {
    STRIPE_API_KEY: str(),
    STRIPE_ENDPOINT_SECRET: str(),

    AZURE_SERVICE_BUS_SUBSCRIPTION: str(),
    AZURE_SERVICE_BUS_CONNECTION_STRING: str(),

    REDIS_HOST_WEBHOOK: str(),
    REDIS_PASSWORD_WEBHOOK: str(),

    LAUNCH_DARKLY_SDK_KEY: str(),
    LAUNCH_DARKLY_ACCESS_TOKEN: str(),
    LAUNCH_DARKLY_ENVIRONMENT_KEY: str(),
  });

  const app = await NestFactory.create(AppModule, {
    // eslint-disable-next-line
    logger: (process.env.LOG_LEVELS?.split(',') ?? [
      'log',
      'error',
      'warn',
    ]) as LogLevel[],
    rawBody: true,
  });

  app.useGlobalPipes(new XssHtmlPipeline());

  await app.listen(process.env.PORT || 3008);

  Logger.log(`Application is running on: ${await app.getUrl()}`, '🚀');
  if (process.env.NODE_ENV !== 'production') {
    Logger.log(`Webhooks are running on: ${await app.getUrl()}/webhook`, '📈');
  }
}
bootstrap();
