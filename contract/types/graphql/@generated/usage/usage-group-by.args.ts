import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageWhereInput } from './usage-where.input';
import { Type } from 'class-transformer';
import { UsageOrderByWithAggregationInput } from './usage-order-by-with-aggregation.input';
import { UsageScalarFieldEnum } from './usage-scalar-field.enum';
import { UsageScalarWhereWithAggregatesInput } from './usage-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { UsageCountAggregateInput } from './usage-count-aggregate.input';
import { UsageAvgAggregateInput } from './usage-avg-aggregate.input';
import { UsageSumAggregateInput } from './usage-sum-aggregate.input';
import { UsageMinAggregateInput } from './usage-min-aggregate.input';
import { UsageMaxAggregateInput } from './usage-max-aggregate.input';

@ArgsType()
export class UsageGroupByArgs {

    @Field(() => UsageWhereInput, {nullable:true})
    @Type(() => UsageWhereInput)
    where?: UsageWhereInput;

    @Field(() => [UsageOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UsageOrderByWithAggregationInput>;

    @Field(() => [UsageScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof UsageScalarFieldEnum>;

    @Field(() => UsageScalarWhereWithAggregatesInput, {nullable:true})
    having?: UsageScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UsageCountAggregateInput, {nullable:true})
    _count?: UsageCountAggregateInput;

    @Field(() => UsageAvgAggregateInput, {nullable:true})
    _avg?: UsageAvgAggregateInput;

    @Field(() => UsageSumAggregateInput, {nullable:true})
    _sum?: UsageSumAggregateInput;

    @Field(() => UsageMinAggregateInput, {nullable:true})
    _min?: UsageMinAggregateInput;

    @Field(() => UsageMaxAggregateInput, {nullable:true})
    _max?: UsageMaxAggregateInput;
}
