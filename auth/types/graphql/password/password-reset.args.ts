import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PasswordResetArgs {
  @Field(() => String, { nullable: false })
  token!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
