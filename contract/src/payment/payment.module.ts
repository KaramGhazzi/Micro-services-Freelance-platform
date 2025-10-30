import { Module } from '@nestjs/common';
import { ContractModule } from '../contract/contract.module';
import { PaymentEvents } from './payment.events';
import { CheckoutModule } from '../checkout/checkout.module';

@Module({
  providers: [PaymentEvents, ContractModule],
  imports: [ContractModule, CheckoutModule],
})
export class PaymentModule {}
