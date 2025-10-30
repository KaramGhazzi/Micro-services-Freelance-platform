import { ConfigService } from '@nestjs/config';
import { RedisClientType } from '@redis/client';
export declare class WebhookCacheService {
    private readonly configService;
    client: RedisClientType;
    redisKeyExpire: number;
    constructor(configService: ConfigService);
    private readonly logger;
    set(key: string): Promise<void>;
    get(key: string): Promise<string>;
}
