import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractWhereInput } from './contract-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyContractArgs {

    @Field(() => ContractWhereInput, {nullable:true})
    @Type(() => ContractWhereInput)
    where?: ContractWhereInput;
}
