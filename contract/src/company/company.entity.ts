import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Contract as ContractType } from '@freelance/contract/client';
import { Contract } from '../../types/graphql/@generated';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Company {
  @Field(() => ID)
  @Directive('@external')
  id: number;

  @Field(() => [Contract], { defaultValue: [] })
  contracts: ContractType[];
}
