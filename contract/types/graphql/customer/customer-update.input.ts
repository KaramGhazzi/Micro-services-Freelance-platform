import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeCustomerMetadataInput } from './customer-metadata.input';
import { StripeCustomerInvoiceSettingsInput } from './customer-invoice-settings.input';
import { StripeCustomerTaxIdDataInput } from './customer-tax-id-data.input';
import { StripeAddressInput } from '../shared/address.input';

@InputType()
export class StripeCustomerUpdateInput implements Stripe.CustomerUpdateParams {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => StripeCustomerMetadataInput, { nullable: true })
  metadata?: Stripe.Emptyable<Stripe.MetadataParam>;

  @Field(() => StripeAddressInput, { nullable: true })
  address?: Stripe.Emptyable<Stripe.AddressParam>;

  @Field(() => StripeCustomerInvoiceSettingsInput, { nullable: true })
  invoice_settings?: Stripe.CustomerCreateParams.InvoiceSettings;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  source?: string;

  @Field(() => [StripeCustomerTaxIdDataInput], { nullable: true })
  tax_id_data?: Array<Stripe.CustomerCreateParams.TaxIdDatum>;
}
