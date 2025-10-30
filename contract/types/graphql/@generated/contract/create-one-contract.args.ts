import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractCreateInput } from './contract-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneContractArgs {

    @Field(() => ContractCreateInput, {nullable:false})
    @Type(() => ContractCreateInput)
    data!: ContractCreateInput;
}
