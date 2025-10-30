import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CheckoutCountAggregate } from './checkout-count-aggregate.output';
import { CheckoutAvgAggregate } from './checkout-avg-aggregate.output';
import { CheckoutSumAggregate } from './checkout-sum-aggregate.output';
import { CheckoutMinAggregate } from './checkout-min-aggregate.output';
import { CheckoutMaxAggregate } from './checkout-max-aggregate.output';

@ObjectType()
export class CheckoutGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    planId!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => String, {nullable:false})
    token!: string;

    @Field(() => String, {nullable:false})
    sessionId!: string;

    @Field(() => CheckoutCountAggregate, {nullable:true})
    _count?: CheckoutCountAggregate;

    @Field(() => CheckoutAvgAggregate, {nullable:true})
    _avg?: CheckoutAvgAggregate;

    @Field(() => CheckoutSumAggregate, {nullable:true})
    _sum?: CheckoutSumAggregate;

    @Field(() => CheckoutMinAggregate, {nullable:true})
    _min?: CheckoutMinAggregate;

    @Field(() => CheckoutMaxAggregate, {nullable:true})
    _max?: CheckoutMaxAggregate;
}
