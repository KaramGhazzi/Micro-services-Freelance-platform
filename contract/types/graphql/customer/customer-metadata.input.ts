import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StripeCustomerMetadataInput {
  @Field(() => String, { nullable: true })
  companyId?: string;
}
