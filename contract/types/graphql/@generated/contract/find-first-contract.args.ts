import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractWhereInput } from './contract-where.input';
import { Type } from 'class-transformer';
import { ContractOrderByWithRelationInput } from './contract-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ContractScalarFieldEnum } from './contract-scalar-field.enum';

@ArgsType()
export class FindFirstContractArgs {

    @Field(() => ContractWhereInput, {nullable:true})
    @Type(() => ContractWhereInput)
    where?: ContractWhereInput;

    @Field(() => [ContractOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ContractOrderByWithRelationInput>;

    @Field(() => ContractWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ContractWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ContractScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ContractScalarFieldEnum>;
}
