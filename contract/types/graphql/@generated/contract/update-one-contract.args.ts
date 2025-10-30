import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractUpdateInput } from './contract-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';

@ArgsType()
export class UpdateOneContractArgs {

    @Field(() => ContractUpdateInput, {nullable:false})
    @Type(() => ContractUpdateInput)
    data!: ContractUpdateInput;

    @Field(() => ContractWhereUniqueInput, {nullable:false})
    @Type(() => ContractWhereUniqueInput)
    where!: Prisma.AtLeast<ContractWhereUniqueInput, 'id'>;
}
