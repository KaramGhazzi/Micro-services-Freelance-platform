import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckoutCreateOutput {
  @Field(() => String, { nullable: false })
  sessionId: string;

  @Field(() => String, { nullable: false })
  sessionUrl: string;
}
