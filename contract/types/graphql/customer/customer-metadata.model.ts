import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StripeCustomerMetadata {
  @Field(() => Number, { nullable: true })
  companyId?: number;
}
