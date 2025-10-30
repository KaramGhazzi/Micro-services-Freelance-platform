import { Module } from '@nestjs/common';
import { UsageEvents } from './usage.events';
import { UsageRepository } from './usage.repository';
import { UsageResolver } from './usage.resolver';
import { ContractModule } from '../contract/contract.module';
import { UsageService } from './usage.service';

@Module({
  providers: [UsageEvents, UsageRepository, UsageResolver, UsageService],
  imports: [ContractModule],
})
export class UsageModule {}
