import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';
import { ContractCountAggregate } from './contract-count-aggregate.output';
import { ContractAvgAggregate } from './contract-avg-aggregate.output';
import { ContractSumAggregate } from './contract-sum-aggregate.output';
import { ContractMinAggregate } from './contract-min-aggregate.output';
import { ContractMaxAggregate } from './contract-max-aggregate.output';

@ObjectType()
export class ContractGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => String, {nullable:true})
    invoiceId?: string;

    @Field(() => Int, {nullable:false})
    planId!: number;

    @Field(() => Date, {nullable:false})
    startDate!: Date | string;

    @Field(() => Date, {nullable:true})
    endDate?: Date | string;

    @Field(() => UsageType, {nullable:false})
    usageType!: keyof typeof UsageType;

    @Field(() => Int, {nullable:true})
    usageAmount?: number;

    @Field(() => Interval, {nullable:true})
    usageInterval?: keyof typeof Interval;

    @Field(() => Int, {nullable:true})
    usageIntervalCount?: number;

    @Field(() => Date, {nullable:true})
    subscriptionExpireDate?: Date | string;

    @Field(() => RenewalInterval, {nullable:true})
    renewalInterval?: keyof typeof RenewalInterval;

    @Field(() => ContractCountAggregate, {nullable:true})
    _count?: ContractCountAggregate;

    @Field(() => ContractAvgAggregate, {nullable:true})
    _avg?: ContractAvgAggregate;

    @Field(() => ContractSumAggregate, {nullable:true})
    _sum?: ContractSumAggregate;

    @Field(() => ContractMinAggregate, {nullable:true})
    _min?: ContractMinAggregate;

    @Field(() => ContractMaxAggregate, {nullable:true})
    _max?: ContractMaxAggregate;
}
