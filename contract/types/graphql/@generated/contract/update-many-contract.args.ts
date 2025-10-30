import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractUpdateManyMutationInput } from './contract-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ContractWhereInput } from './contract-where.input';

@ArgsType()
export class UpdateManyContractArgs {

    @Field(() => ContractUpdateManyMutationInput, {nullable:false})
    @Type(() => ContractUpdateManyMutationInput)
    data!: ContractUpdateManyMutationInput;

    @Field(() => ContractWhereInput, {nullable:true})
    @Type(() => ContractWhereInput)
    where?: ContractWhereInput;
}
