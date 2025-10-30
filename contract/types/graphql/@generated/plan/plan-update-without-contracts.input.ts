import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Int } from '@nestjs/graphql';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';
import { ProductUpdateOneRequiredWithoutPlansNestedInput } from '../product/product-update-one-required-without-plans-nested.input';
import { CheckoutUpdateManyWithoutPlanNestedInput } from '../checkout/checkout-update-many-without-plan-nested.input';

@InputType()
export class PlanUpdateWithoutContractsInput {

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => Boolean, {nullable:true})
    externalProviderSync?: boolean;

    @Field(() => String, {nullable:true})
    externalProviderPaymentMethodId?: string;

    @Field(() => String, {nullable:true})
    slug?: string;

    @Field(() => UsageType, {nullable:true})
    usageType?: keyof typeof UsageType;

    @Field(() => Int, {nullable:true})
    usageAmount?: number;

    @Field(() => Interval, {nullable:true})
    usageInterval?: keyof typeof Interval;

    @Field(() => Int, {nullable:true})
    usageIntervalCount?: number;

    @Field(() => RenewalInterval, {nullable:true})
    renewalInterval?: keyof typeof RenewalInterval;

    @Field(() => ProductUpdateOneRequiredWithoutPlansNestedInput, {nullable:true})
    product?: ProductUpdateOneRequiredWithoutPlansNestedInput;

    @Field(() => CheckoutUpdateManyWithoutPlanNestedInput, {nullable:true})
    checkouts?: CheckoutUpdateManyWithoutPlanNestedInput;
}
