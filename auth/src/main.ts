import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel } from '@nestjs/common';
import { cleanEnv, str, url } from 'envalid';
import { XssHtmlPipeline } from '@package/pipeline';
import { AppModule } from './app.module';

async function bootstrap() {
  // validate main module environment variables
  cleanEnv(process.env, {
    // PWA
    PWA_URL: url(),

    // firebase
    FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY_BASE64: str(),
    FIREBASE_CLIENT_CONFIG_BASE64: str(),
    FIREBASE_API_KEY: str(),

    // service bus
    AZURE_SERVICE_BUS_SUBSCRIPTION: str(),
    AZURE_SERVICE_BUS_CONNECTION_STRING: str(),

    // redis
    REDIS_HOST: url(),
    REDIS_PASSWORD: str(),

    // M2M-api-key
    M2M_API_KEY: str(),

    // GRAPHQL
    GRAPHQL_URL: url(),
  });

  if (process.env.NODE_ENV === 'development') {
    cleanEnv(process.env, {
      SB_TOPIC_PREFIX: str(),
    });
  }

  if (!process.env.M2M_API_KEY) {
    throw Error('M2M API KEY should be set.');
  }

  const app = await NestFactory.create(AppModule, {
    logger: (process.env.LOG_LEVELS?.split(',') ?? [
      'log',
      'error',
      'warn',
    ]) as LogLevel[],
  });

  app.useGlobalPipes(new XssHtmlPipeline());

  await app.listen(process.env.PORT || 3002);

  Logger.log(`Application is running on: ${await app.getUrl()}`, '🚀');
  if (process.env.NODE_ENV !== 'production') {
    Logger.log(
      `GraphQL Playground is running on: ${await app.getUrl()}/graphql`,
      '📈'
    );
  }
}
bootstrap();
