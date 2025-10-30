import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel } from '@nestjs/common';
import { cleanEnv, str, url } from 'envalid';
import { XssHtmlPipeline } from '@package/pipeline';
import { AppModule } from './app.module';

async function bootstrap() {
  cleanEnv(process.env, {
    // Database
    CONTRACT_DATABASE_URL: url(),

    // Stripe
    STRIPE_API_KEY: str(),
    STRIPE_API_VERSION: str(),
    STRIPE_SUCCESS_RETURN_PAGE: str(),
    STRIPE_FAILURE_RETURN_PAGE: str(),

    // Azure Service Bus
    AZURE_SERVICE_BUS_CONNECTION_STRING: str(),
    AZURE_SERVICE_BUS_SUBSCRIPTION: str(),

    // Redis
    REDIS_HOST: url(),
    REDIS_PASSWORD: str(),
  });

  if (process.env.NODE_ENV === 'development') {
    cleanEnv(process.env, {
      SB_TOPIC_PREFIX: str(),
    });
  }

  const app = await NestFactory.create(AppModule, {
    logger: (process.env.LOG_LEVELS?.split(',') ?? [
      'log',
      'error',
      'warn',
    ]) as LogLevel[],
  });

  app.useGlobalPipes(new XssHtmlPipeline());

  await app.listen(process.env.PORT || 3007);

  Logger.log(`Application is running on: ${await app.getUrl()}`, '🚀');
  if (process.env.NODE_ENV !== 'production') {
    Logger.log(
      `GraphQL Playground is running on: ${await app.getUrl()}/graphql`,
      '📈'
    );
  }
}
bootstrap();
