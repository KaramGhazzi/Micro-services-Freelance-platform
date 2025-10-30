import { Module, forwardRef } from '@nestjs/common';
import { AuthorizationCacheService } from '@package/authorization';
import { ContractRepository } from './contract.repository';
import { ContractResolver } from './contract.resolver';
import { ContractService } from './contract.service';
import { PlanModule } from '../plan/plan.module';
import { ExternalProviderCompanyModule } from '../external-provider-company/external-provider-company.module';
import { ContractCron } from './contract.cron';
import { ProductModule } from '../product/product.module';

@Module({
  providers: [
    ContractRepository,
    ContractResolver,
    ContractService,
    AuthorizationCacheService,
    ContractCron,
  ],
  exports: [ContractRepository, ContractService],
  imports: [
    PlanModule,
    forwardRef(() => ExternalProviderCompanyModule),
    ProductModule,
  ],
})
export class ContractModule {}
