import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EndProContractOutput {
  @Field(() => Boolean, { nullable: false })
  isSuccessful!: boolean;
}
