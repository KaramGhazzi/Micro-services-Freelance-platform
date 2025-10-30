import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PasswordResetOutput {
  @Field(() => String, { nullable: false })
  token!: string;
}
