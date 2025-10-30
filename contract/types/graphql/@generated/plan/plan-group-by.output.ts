import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';
import { PlanCountAggregate } from './plan-count-aggregate.output';
import { PlanAvgAggregate } from './plan-avg-aggregate.output';
import { PlanSumAggregate } from './plan-sum-aggregate.output';
import { PlanMinAggregate } from './plan-min-aggregate.output';
import { PlanMaxAggregate } from './plan-max-aggregate.output';

@ObjectType()
export class PlanGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => Boolean, {nullable:false})
    externalProviderSync!: boolean;

    @Field(() => String, {nullable:true})
    externalProviderPaymentMethodId?: string;

    @Field(() => String, {nullable:true})
    slug?: string;

    @Field(() => Int, {nullable:false})
    productId!: number;

    @Field(() => UsageType, {nullable:false})
    usageType!: keyof typeof UsageType;

    @Field(() => Int, {nullable:true})
    usageAmount?: number;

    @Field(() => Interval, {nullable:true})
    usageInterval?: keyof typeof Interval;

    @Field(() => Int, {nullable:true})
    usageIntervalCount?: number;

    @Field(() => RenewalInterval, {nullable:true})
    renewalInterval?: keyof typeof RenewalInterval;

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
