import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from '@redis/client';

const defaultRedisKeyExpire = 3600 * 24 * 3; // 3 days

@Injectable()
export class WebhookCacheService {
  client: RedisClientType;
  redisKeyExpire = defaultRedisKeyExpire;

  constructor(private readonly configService: ConfigService) {
    const redisHost = this.configService.get('REDIS_HOST_WEBHOOK');
    const redisPassword = this.configService.get('REDIS_PASSWORD_WEBHOOK');
    this.redisKeyExpire =
      this.configService.get('REDIS_KEY_EXPIRE_WEBHOOK') ??
      defaultRedisKeyExpire;

    if (!redisHost || !redisPassword) {
      this.logger.warn(
        'Error initializing Redis: host or password is not set. Skipping...'
      );
      return;
    }

    this.client = createClient({
      url: redisHost,
      password: redisPassword,
    });

    this.client.on('error', (error: unknown) => {
      this.logger.error(error);
    });

    this.client.connect().then(() => {
      this.logger.log('Redis connected');
    });
  }

  private readonly logger = new Logger(WebhookCacheService.name);

  async set(key: string): Promise<void> {
    this.logger.debug(`Adding key ${key}`);
    await this.client.set(key, '', { EX: this.redisKeyExpire });
  }

  async get(key: string): Promise<string> {
    return this.client.get(key);
  }
}
