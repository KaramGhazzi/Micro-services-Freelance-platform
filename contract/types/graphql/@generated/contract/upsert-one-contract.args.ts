import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { Type } from 'class-transformer';
import { ContractCreateInput } from './contract-create.input';
import { ContractUpdateInput } from './contract-update.input';

@ArgsType()
export class UpsertOneContractArgs {

    @Field(() => ContractWhereUniqueInput, {nullable:false})
    @Type(() => ContractWhereUniqueInput)
    where!: Prisma.AtLeast<ContractWhereUniqueInput, 'id'>;

    @Field(() => ContractCreateInput, {nullable:false})
    @Type(() => ContractCreateInput)
    create!: ContractCreateInput;

    @Field(() => ContractUpdateInput, {nullable:false})
    @Type(() => ContractUpdateInput)
    update!: ContractUpdateInput;
}
