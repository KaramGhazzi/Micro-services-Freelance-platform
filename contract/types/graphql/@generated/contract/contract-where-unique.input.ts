import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ContractWhereInput } from './contract-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumUsageTypeFilter } from '../prisma/enum-usage-type-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { EnumIntervalNullableFilter } from '../prisma/enum-interval-nullable-filter.input';
import { EnumRenewalIntervalNullableFilter } from '../prisma/enum-renewal-interval-nullable-filter.input';
import { PlanRelationFilter } from '../plan/plan-relation-filter.input';

@InputType()
export class ContractWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [ContractWhereInput], {nullable:true})
    AND?: Array<ContractWhereInput>;

    @Field(() => [ContractWhereInput], {nullable:true})
    OR?: Array<ContractWhereInput>;

    @Field(() => [ContractWhereInput], {nullable:true})
    NOT?: Array<ContractWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    companyId?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    externalProviderId?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    invoiceId?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    planId?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    startDate?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    endDate?: DateTimeNullableFilter;

    @Field(() => EnumUsageTypeFilter, {nullable:true})
    usageType?: EnumUsageTypeFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    usageAmount?: IntNullableFilter;

    @Field(() => EnumIntervalNullableFilter, {nullable:true})
    usageInterval?: EnumIntervalNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    usageIntervalCount?: IntNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    subscriptionExpireDate?: DateTimeNullableFilter;

    @Field(() => EnumRenewalIntervalNullableFilter, {nullable:true})
    renewalInterval?: EnumRenewalIntervalNullableFilter;

    @Field(() => PlanRelationFilter, {nullable:true})
    plan?: PlanRelationFilter;
}
