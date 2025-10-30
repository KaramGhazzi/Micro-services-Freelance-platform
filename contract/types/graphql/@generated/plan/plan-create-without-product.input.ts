import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Int } from '@nestjs/graphql';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';
import { ContractCreateNestedManyWithoutPlanInput } from '../contract/contract-create-nested-many-without-plan.input';
import { CheckoutCreateNestedManyWithoutPlanInput } from '../checkout/checkout-create-nested-many-without-plan.input';

@InputType()
export class PlanCreateWithoutProductInput {

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => Boolean, {nullable:false})
    externalProviderSync!: boolean;

    @Field(() => String, {nullable:true})
    externalProviderPaymentMethodId?: string;

    @Field(() => String, {nullable:true})
    slug?: string;

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

    @Field(() => ContractCreateNestedManyWithoutPlanInput, {nullable:true})
    contracts?: ContractCreateNestedManyWithoutPlanInput;

    @Field(() => CheckoutCreateNestedManyWithoutPlanInput, {nullable:true})
    checkouts?: CheckoutCreateNestedManyWithoutPlanInput;
}
