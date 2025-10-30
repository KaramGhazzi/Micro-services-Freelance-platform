import { Module } from '@nestjs/common';
import { SubscriptionResolver } from './subscription.resolver';
import { SubscriptionService } from './subscription.service';
import { ContractModule } from '../contract/contract.module';
import { ExternalProviderCompanyModule } from '../external-provider-company/external-provider-company.module';
import { SubscriptionEvents } from './subscription.events';
import { PlanModule } from '../plan/plan.module';
import { SubscriptionUserIsPartOfCompanyGuard } from './guards/user-is-part-of-company.guard';

@Module({
  providers: [
    SubscriptionResolver,
    SubscriptionService,
    SubscriptionEvents,
    SubscriptionUserIsPartOfCompanyGuard,
  ],
  exports: [SubscriptionService],
  imports: [ContractModule, ExternalProviderCompanyModule, PlanModule],
})
export class SubscriptionModule {}
