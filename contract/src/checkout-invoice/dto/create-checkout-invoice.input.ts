import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CheckoutInvoiceCreateInput {
  @Field(() => Int)
  planId: number;

  @Field(() => Int, { nullable: true })
  quantity: number;
}
