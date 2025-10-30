import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneContractArgs {

    @Field(() => ContractWhereUniqueInput, {nullable:false})
    @Type(() => ContractWhereUniqueInput)
    where!: Prisma.AtLeast<ContractWhereUniqueInput, 'id'>;
}
