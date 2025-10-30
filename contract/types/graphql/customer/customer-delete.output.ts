import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StripeCustomerDeleteOutput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  object: string;

  @Field(() => Boolean, { nullable: false })
  deleted: boolean;
}
