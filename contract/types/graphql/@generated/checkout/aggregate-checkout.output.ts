import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CheckoutCountAggregate } from './checkout-count-aggregate.output';
import { CheckoutAvgAggregate } from './checkout-avg-aggregate.output';
import { CheckoutSumAggregate } from './checkout-sum-aggregate.output';
import { CheckoutMinAggregate } from './checkout-min-aggregate.output';
import { CheckoutMaxAggregate } from './checkout-max-aggregate.output';

@ObjectType()
export class AggregateCheckout {

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
