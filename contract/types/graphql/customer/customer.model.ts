import { ObjectType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeCustomerMetadata } from './customer-metadata.model';
import { StripeAddress } from '../shared/address.model';
import { StripeCustomerInvoiceSettings } from './customer-invoice-settings.model';

@ObjectType()
export class StripeCustomer implements Partial<Stripe.Customer> {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  object: 'customer';

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => StripeCustomerMetadata, { nullable: true })
  metadata?: Stripe.Metadata;

  @Field(() => StripeAddress, { nullable: true })
  address: Stripe.Address;

  @Field(() => StripeCustomerInvoiceSettings, { nullable: true })
  invoice_settings?: Stripe.Customer.InvoiceSettings;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  source?: string;

  @Field(() => Boolean, { nullable: true })
  delinquent?: boolean;

  @Field(() => Number, { nullable: false })
  created: number;
}
