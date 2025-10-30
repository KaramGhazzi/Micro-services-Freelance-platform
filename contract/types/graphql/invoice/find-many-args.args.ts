import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class FindManyArgs {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
