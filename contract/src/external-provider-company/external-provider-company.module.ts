import { Module, forwardRef } from '@nestjs/common';
import { ExternalProviderCompanyEvents } from './external-provider-company.events';
import { ContractModule } from '../contract/contract.module';
import { PlanModule } from '../plan/plan.module';
import { ExternalProviderCompanyRepository } from './external-provider-company.repository';
import { ExternalProviderCompanyService } from './external-provider-company.service';

@Module({
  providers: [
    ExternalProviderCompanyEvents,
    ExternalProviderCompanyRepository,
    ExternalProviderCompanyService,
  ],
  imports: [forwardRef(() => ContractModule), PlanModule],
  exports: [ExternalProviderCompanyRepository, ExternalProviderCompanyService],
})
export class ExternalProviderCompanyModule {}
