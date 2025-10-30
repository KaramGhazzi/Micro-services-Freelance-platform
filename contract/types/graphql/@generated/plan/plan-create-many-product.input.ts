import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';

@InputType()
export class PlanCreateManyProductInput {

    @Field(() => Int, {nullable:true})
    id?: number;

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
}
