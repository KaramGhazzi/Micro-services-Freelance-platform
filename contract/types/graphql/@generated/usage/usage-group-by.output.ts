import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { UsageCountAggregate } from './usage-count-aggregate.output';
import { UsageAvgAggregate } from './usage-avg-aggregate.output';
import { UsageSumAggregate } from './usage-sum-aggregate.output';
import { UsageMinAggregate } from './usage-min-aggregate.output';
import { UsageMaxAggregate } from './usage-max-aggregate.output';

@ObjectType()
export class UsageGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => UsageType, {nullable:false})
    type!: keyof typeof UsageType;

    @Field(() => Int, {nullable:false})
    amount!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Date, {nullable:false})
    created!: Date | string;

    @Field(() => Int, {nullable:true})
    objectId?: number;

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
