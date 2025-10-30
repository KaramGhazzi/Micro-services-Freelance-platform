import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ContractWhereInput } from './contract-where.input';

@InputType()
export class ContractListRelationFilter {

    @Field(() => ContractWhereInput, {nullable:true})
    every?: ContractWhereInput;

    @Field(() => ContractWhereInput, {nullable:true})
    some?: ContractWhereInput;

    @Field(() => ContractWhereInput, {nullable:true})
    none?: ContractWhereInput;
}
