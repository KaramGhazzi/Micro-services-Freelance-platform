import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PasswordUpdateArgs {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  currentPassword!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
