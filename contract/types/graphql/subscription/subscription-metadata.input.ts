import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StripeSubscriptionMetadataInput {
  @Field(() => Number, { nullable: true })
  companyId?: number;
}
