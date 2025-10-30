import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';
import { Product } from '../product/product.model';
import { Contract } from '../contract/contract.model';
import { Checkout } from '../checkout/checkout.model';
import { PlanCount } from './plan-count.output';

@ObjectType()
export class Plan {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:true})
    externalProviderId!: string | null;

    @Field(() => Boolean, {nullable:false})
    externalProviderSync!: boolean;

    @Field(() => String, {nullable:true})
    externalProviderPaymentMethodId!: string | null;

    @Field(() => String, {nullable:true})
    slug!: string | null;

    @Field(() => Int, {nullable:false})
    productId!: number;

    @Field(() => UsageType, {nullable:false})
    usageType!: keyof typeof UsageType;

    @Field(() => Int, {nullable:true})
    usageAmount!: number | null;

    @Field(() => Interval, {nullable:true})
    usageInterval!: keyof typeof Interval | null;

    @Field(() => Int, {nullable:true})
    usageIntervalCount!: number | null;

    @Field(() => RenewalInterval, {nullable:true})
    renewalInterval!: keyof typeof RenewalInterval | null;

    @Field(() => Product, {nullable:false})
    product?: Product;

    @Field(() => [Contract], {nullable:true})
    contracts?: Array<Contract>;

    @Field(() => [Checkout], {nullable:true})
    checkouts?: Array<Checkout>;

    @Field(() => PlanCount, {nullable:false})
    _count?: PlanCount;
}
