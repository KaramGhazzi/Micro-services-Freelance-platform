import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookCacheService } from '../webhook-cache.service';
import { HubspotController } from './hubspot.controller';

@Module({
  imports: [ConfigModule],
  providers: [WebhookCacheService],
  controllers: [HubspotController],
})
export class HubspotModule {}
