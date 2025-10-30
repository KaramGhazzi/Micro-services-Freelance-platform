import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Interval } from '../prisma/interval.enum';
import { RenewalInterval } from '../prisma/renewal-interval.enum';
import { Plan } from '../plan/plan.model';

@ObjectType()
export class Contract {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => String, {nullable:true})
    externalProviderId!: string | null;

    @Field(() => String, {nullable:true})
    invoiceId!: string | null;

    @Field(() => Int, {nullable:false})
    planId!: number;

    @Field(() => Date, {nullable:false})
    startDate!: Date;

    @Field(() => Date, {nullable:true})
    endDate!: Date | null;

    @Field(() => UsageType, {nullable:false})
    usageType!: keyof typeof UsageType;

    @Field(() => Int, {nullable:true})
    usageAmount!: number | null;

    @Field(() => Interval, {nullable:true})
    usageInterval!: keyof typeof Interval | null;

    @Field(() => Int, {nullable:true})
    usageIntervalCount!: number | null;

    @Field(() => Date, {nullable:true})
    subscriptionExpireDate!: Date | null;

    @Field(() => RenewalInterval, {nullable:true})
    renewalInterval!: keyof typeof RenewalInterval | null;

    @Field(() => Plan, {nullable:false})
    plan?: Plan;
}
