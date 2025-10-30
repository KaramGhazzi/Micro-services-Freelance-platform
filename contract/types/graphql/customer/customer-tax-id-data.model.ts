import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StripeCustomerTaxIdData {
  @Field(() => String, { nullable: false })
  type?: string;

  @Field(() => String, { nullable: false })
  value?: string;
}
