import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ConfirmArgs {
  @Field(() => String, { nullable: false })
  token!: string;
}
