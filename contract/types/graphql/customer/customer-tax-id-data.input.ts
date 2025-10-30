import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StripeCustomerTaxIdDataInput {
  @Field(() => String, { nullable: false })
  type?: string;

  @Field(() => String, { nullable: false })
  value?: string;
}
