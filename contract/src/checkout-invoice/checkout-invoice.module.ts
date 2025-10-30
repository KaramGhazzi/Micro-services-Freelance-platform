import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@package/authorization';
import { ContractModule } from '../contract/contract.module';
import { ExternalProviderCompanyModule } from '../external-provider-company/external-provider-company.module';
import { PlanModule } from '../plan/plan.module';
import { ProductModule } from '../product/product.module';
import { CheckoutInvoiceResolver } from './checkout-invoice.resolver';
import { CheckoutInvoiceService } from './checkout-invoice.service';

@Module({
  imports: [
    AuthorizationModule,
    ContractModule,
    ExternalProviderCompanyModule,
    PlanModule,
    ProductModule,
  ],
  providers: [CheckoutInvoiceResolver, CheckoutInvoiceService],
})
export class CheckoutInvoiceModule {}
