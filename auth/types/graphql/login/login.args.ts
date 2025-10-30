import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
