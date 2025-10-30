import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ContractOutput {
  @Field(() => Number, { nullable: false })
  companyId: number;

  @Field(() => [String], { nullable: false })
  slugs: string[];
}
