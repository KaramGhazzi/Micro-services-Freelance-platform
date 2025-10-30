import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';
import { ContractUncheckedUpdateManyWithoutPlanNestedInput } from '../contract/contract-unchecked-update-many-without-plan-nested.input';

@InputType()
export class PlanUncheckedUpdateWithoutCheckoutsInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => Boolean, {nullable:true})
    externalProviderSync?: boolean;

    @Field(() => String, {nullable:true})
    externalProviderPaymentMethodId?: string;

    @Field(() => String, {nullable:true})
    slug?: string;

    @Field(() => Int, {nullable:true})
    productId?: number;

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

    @Field(() => ContractUncheckedUpdateManyWithoutPlanNestedInput, {nullable:true})
    contracts?: ContractUncheckedUpdateManyWithoutPlanNestedInput;
}
