import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RequestEmailChangeOutput {
  @Field(() => Boolean, { nullable: false })
  success!: boolean;
}
