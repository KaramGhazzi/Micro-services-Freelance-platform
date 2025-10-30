import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeCustomerMetadataInput } from './customer-metadata.input';
import { StripeCustomerInvoiceSettingsInput } from './customer-invoice-settings.input';
import { StripeCustomerTaxIdDataInput } from './customer-tax-id-data.input';
import { StripeAddressInput } from '../shared/address.input';

@InputType()
export class StripeCustomerCreateInput implements Stripe.CustomerCreateParams {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => StripeCustomerMetadataInput, { nullable: false })
  metadata: Stripe.Emptyable<Stripe.MetadataParam>;

  @Field(() => StripeAddressInput, { nullable: false })
  address: Stripe.Emptyable<Stripe.AddressParam>;

  @Field(() => StripeCustomerInvoiceSettingsInput, { nullable: true })
  invoice_settings?: Stripe.CustomerCreateParams.InvoiceSettings;

  @Field(() => String, { nullable: true })
  payment_method?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  source?: string;

  @Field(() => [StripeCustomerTaxIdDataInput], { nullable: true })
  tax_id_data?: Array<Stripe.CustomerCreateParams.TaxIdDatum>;
}
