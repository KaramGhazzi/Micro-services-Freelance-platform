import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateContractOutput {
  @Field(() => Boolean, { nullable: false })
  isSuccess!: boolean;
}
