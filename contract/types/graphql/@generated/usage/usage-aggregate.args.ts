import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageWhereInput } from './usage-where.input';
import { Type } from 'class-transformer';
import { UsageOrderByWithRelationInput } from './usage-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { UsageWhereUniqueInput } from './usage-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UsageCountAggregateInput } from './usage-count-aggregate.input';
import { UsageAvgAggregateInput } from './usage-avg-aggregate.input';
import { UsageSumAggregateInput } from './usage-sum-aggregate.input';
import { UsageMinAggregateInput } from './usage-min-aggregate.input';
import { UsageMaxAggregateInput } from './usage-max-aggregate.input';

@ArgsType()
export class UsageAggregateArgs {

    @Field(() => UsageWhereInput, {nullable:true})
    @Type(() => UsageWhereInput)
    where?: UsageWhereInput;

    @Field(() => [UsageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UsageOrderByWithRelationInput>;

    @Field(() => UsageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UsageWhereUniqueInput, 'id' | 'companyId_type_objectId'>;

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
