import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateContractOutput {
  @Field(() => Boolean, { nullable: false })
  success!: boolean;
}
