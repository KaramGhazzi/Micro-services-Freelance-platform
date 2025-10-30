import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StripeCustomerInvoiceSettingsInput {
  @Field(() => String, { nullable: true })
  default_payment_method?: string;
}
