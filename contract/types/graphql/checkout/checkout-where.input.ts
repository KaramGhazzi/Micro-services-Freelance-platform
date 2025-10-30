import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CheckoutWhereInput {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String, { nullable: true })
  sessionId?: string;
}
