import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StripeCustomerInvoiceSettings {
  @Field(() => String, { nullable: true })
  default_payment_method?: string;
}
