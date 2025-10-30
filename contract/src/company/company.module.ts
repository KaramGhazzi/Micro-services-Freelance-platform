import { Module, forwardRef } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { ContractModule } from '../contract/contract.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  providers: [CompanyResolver],
  imports: [forwardRef(() => ContractModule), PlanModule],
  exports: [],
})
export class CompanyModule {}
