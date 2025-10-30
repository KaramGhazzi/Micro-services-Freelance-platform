import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StripeSubscriptionMetadata {
  @Field(() => Number, { nullable: true })
  companyId?: number;

  @Field(() => String, { nullable: true })
  type?: string;
}
