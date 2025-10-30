import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RefreshSessionArgs {
  @Field(() => String, { nullable: false })
  refreshToken!: string;
}
