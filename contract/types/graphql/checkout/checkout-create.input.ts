import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CheckoutCreateInput {
  @Field(() => Int, { nullable: false })
  planId: number;

  @Field(() => Int, { nullable: false })
  companyId: number;

  @Field(() => Int, { nullable: true })
  quantity: number;
}
