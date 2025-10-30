import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UsageCountAggregate } from './usage-count-aggregate.output';
import { UsageAvgAggregate } from './usage-avg-aggregate.output';
import { UsageSumAggregate } from './usage-sum-aggregate.output';
import { UsageMinAggregate } from './usage-min-aggregate.output';
import { UsageMaxAggregate } from './usage-max-aggregate.output';

@ObjectType()
export class AggregateUsage {

    @Field(() => UsageCountAggregate, {nullable:true})
    _count?: UsageCountAggregate;

    @Field(() => UsageAvgAggregate, {nullable:true})
    _avg?: UsageAvgAggregate;

    @Field(() => UsageSumAggregate, {nullable:true})
    _sum?: UsageSumAggregate;

    @Field(() => UsageMinAggregate, {nullable:true})
    _min?: UsageMinAggregate;

    @Field(() => UsageMaxAggregate, {nullable:true})
    _max?: UsageMaxAggregate;
}
