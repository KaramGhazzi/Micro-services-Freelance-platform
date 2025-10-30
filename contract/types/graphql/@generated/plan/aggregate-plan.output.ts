import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { PlanCountAggregate } from './plan-count-aggregate.output';
import { PlanAvgAggregate } from './plan-avg-aggregate.output';
import { PlanSumAggregate } from './plan-sum-aggregate.output';
import { PlanMinAggregate } from './plan-min-aggregate.output';
import { PlanMaxAggregate } from './plan-max-aggregate.output';

@ObjectType()
export class AggregatePlan {

    @Field(() => PlanCountAggregate, {nullable:true})
    _count?: PlanCountAggregate;

    @Field(() => PlanAvgAggregate, {nullable:true})
    _avg?: PlanAvgAggregate;

    @Field(() => PlanSumAggregate, {nullable:true})
    _sum?: PlanSumAggregate;

    @Field(() => PlanMinAggregate, {nullable:true})
    _min?: PlanMinAggregate;

    @Field(() => PlanMaxAggregate, {nullable:true})
    _max?: PlanMaxAggregate;
}
