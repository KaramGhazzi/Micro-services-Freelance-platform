import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumUsageTypeFilter } from '../prisma/enum-usage-type-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { EnumIntervalNullableFilter } from '../prisma/enum-interval-nullable-filter.input';
import { EnumRenewalIntervalNullableFilter } from '../prisma/enum-renewal-interval-nullable-filter.input';

@InputType()
export class ContractScalarWhereInput {

    @Field(() => [ContractScalarWhereInput], {nullable:true})
    AND?: Array<ContractScalarWhereInput>;

    @Field(() => [ContractScalarWhereInput], {nullable:true})
    OR?: Array<ContractScalarWhereInput>;

    @Field(() => [ContractScalarWhereInput], {nullable:true})
    NOT?: Array<ContractScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

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
}
