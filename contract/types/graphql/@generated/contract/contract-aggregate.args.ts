import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractWhereInput } from './contract-where.input';
import { Type } from 'class-transformer';
import { ContractOrderByWithRelationInput } from './contract-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ContractCountAggregateInput } from './contract-count-aggregate.input';
import { ContractAvgAggregateInput } from './contract-avg-aggregate.input';
import { ContractSumAggregateInput } from './contract-sum-aggregate.input';
import { ContractMinAggregateInput } from './contract-min-aggregate.input';
import { ContractMaxAggregateInput } from './contract-max-aggregate.input';

@ArgsType()
export class ContractAggregateArgs {

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

    @Field(() => ContractCountAggregateInput, {nullable:true})
    _count?: ContractCountAggregateInput;

    @Field(() => ContractAvgAggregateInput, {nullable:true})
    _avg?: ContractAvgAggregateInput;

    @Field(() => ContractSumAggregateInput, {nullable:true})
    _sum?: ContractSumAggregateInput;

    @Field(() => ContractMinAggregateInput, {nullable:true})
    _min?: ContractMinAggregateInput;

    @Field(() => ContractMaxAggregateInput, {nullable:true})
    _max?: ContractMaxAggregateInput;
}
