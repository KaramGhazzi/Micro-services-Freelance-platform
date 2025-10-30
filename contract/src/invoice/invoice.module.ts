import { Module } from '@nestjs/common';
import { ContractRepository } from '../contract/contract.repository';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';
import { InvoiceEvents } from './invoice.events';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';

@Module({
  providers: [
    InvoiceEvents,
    InvoiceResolver,
    InvoiceService,
    ContractRepository,
    ExternalProviderCompanyRepository,
  ],
  exports: [InvoiceService],
})
export class InvoiceModule {}
