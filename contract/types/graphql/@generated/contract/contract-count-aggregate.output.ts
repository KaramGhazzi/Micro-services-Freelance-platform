import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ContractCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Int, {nullable:false})
    externalProviderId!: number;

    @Field(() => Int, {nullable:false})
    invoiceId!: number;

    @Field(() => Int, {nullable:false})
    planId!: number;

    @Field(() => Int, {nullable:false})
    startDate!: number;

    @Field(() => Int, {nullable:false})
    endDate!: number;

    @Field(() => Int, {nullable:false})
    usageType!: number;

    @Field(() => Int, {nullable:false})
    usageAmount!: number;

    @Field(() => Int, {nullable:false})
    usageInterval!: number;

    @Field(() => Int, {nullable:false})
    usageIntervalCount!: number;

    @Field(() => Int, {nullable:false})
    subscriptionExpireDate!: number;

    @Field(() => Int, {nullable:false})
    renewalInterval!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
