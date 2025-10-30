import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PlanCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    externalProviderId!: number;

    @Field(() => Int, {nullable:false})
    externalProviderSync!: number;

    @Field(() => Int, {nullable:false})
    externalProviderPaymentMethodId!: number;

    @Field(() => Int, {nullable:false})
    slug!: number;

    @Field(() => Int, {nullable:false})
    productId!: number;

    @Field(() => Int, {nullable:false})
    usageType!: number;

    @Field(() => Int, {nullable:false})
    usageAmount!: number;

    @Field(() => Int, {nullable:false})
    usageInterval!: number;

    @Field(() => Int, {nullable:false})
    usageIntervalCount!: number;

    @Field(() => Int, {nullable:false})
    renewalInterval!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
