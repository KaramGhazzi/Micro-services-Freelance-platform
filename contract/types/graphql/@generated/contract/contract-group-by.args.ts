import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractWhereInput } from './contract-where.input';
import { Type } from 'class-transformer';
import { ContractOrderByWithAggregationInput } from './contract-order-by-with-aggregation.input';
import { ContractScalarFieldEnum } from './contract-scalar-field.enum';
import { ContractScalarWhereWithAggregatesInput } from './contract-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ContractCountAggregateInput } from './contract-count-aggregate.input';
import { ContractAvgAggregateInput } from './contract-avg-aggregate.input';
import { ContractSumAggregateInput } from './contract-sum-aggregate.input';
import { ContractMinAggregateInput } from './contract-min-aggregate.input';
import { ContractMaxAggregateInput } from './contract-max-aggregate.input';

@ArgsType()
export class ContractGroupByArgs {

    @Field(() => ContractWhereInput, {nullable:true})
    @Type(() => ContractWhereInput)
    where?: ContractWhereInput;

    @Field(() => [ContractOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ContractOrderByWithAggregationInput>;

    @Field(() => [ContractScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ContractScalarFieldEnum>;

    @Field(() => ContractScalarWhereWithAggregatesInput, {nullable:true})
    having?: ContractScalarWhereWithAggregatesInput;

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
