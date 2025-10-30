import { Module } from '@nestjs/common';
import { CheckoutRepository } from './checkout.repository';
import { CheckoutService } from './checkout.service';
import { PlanModule } from '../plan/plan.module';
import { CheckoutResolver } from './checkout.resolver';
import { ExternalProviderCompanyModule } from '../external-provider-company/external-provider-company.module';
import { ContractModule } from '../contract/contract.module';
import { CheckoutUserPartOfCompanyGuard } from './guards/checkout-user-part-of-company.guard';

@Module({
  providers: [
    CheckoutService,
    CheckoutRepository,
    CheckoutResolver,
    CheckoutUserPartOfCompanyGuard,
  ],
  exports: [CheckoutService, CheckoutRepository],
  imports: [PlanModule, ExternalProviderCompanyModule, ContractModule],
})
export class CheckoutModule {}
