import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PasswordUpdateOutput {
  @Field(() => String, { nullable: false })
  success!: boolean;
}
