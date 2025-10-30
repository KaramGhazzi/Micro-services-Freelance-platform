import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterOutput {
  @Field(() => String, { nullable: false })
  success!: boolean;
}
