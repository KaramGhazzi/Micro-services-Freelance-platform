import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PasswordForgetOutput {
  @Field(() => String, { nullable: false })
  success!: boolean;
}
