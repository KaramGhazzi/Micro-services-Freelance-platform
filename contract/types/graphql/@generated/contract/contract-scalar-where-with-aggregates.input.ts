import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { EnumUsageTypeWithAggregatesFilter } from '../prisma/enum-usage-type-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { EnumIntervalNullableWithAggregatesFilter } from '../prisma/enum-interval-nullable-with-aggregates-filter.input';
import { EnumRenewalIntervalNullableWithAggregatesFilter } from '../prisma/enum-renewal-interval-nullable-with-aggregates-filter.input';

@InputType()
export class ContractScalarWhereWithAggregatesInput {

    @Field(() => [ContractScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ContractScalarWhereWithAggregatesInput>;

    @Field(() => [ContractScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ContractScalarWhereWithAggregatesInput>;

    @Field(() => [ContractScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ContractScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    companyId?: IntWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    externalProviderId?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    invoiceId?: StringNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    planId?: IntWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    startDate?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    endDate?: DateTimeNullableWithAggregatesFilter;

    @Field(() => EnumUsageTypeWithAggregatesFilter, {nullable:true})
    usageType?: EnumUsageTypeWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    usageAmount?: IntNullableWithAggregatesFilter;

    @Field(() => EnumIntervalNullableWithAggregatesFilter, {nullable:true})
    usageInterval?: EnumIntervalNullableWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    usageIntervalCount?: IntNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    subscriptionExpireDate?: DateTimeNullableWithAggregatesFilter;

    @Field(() => EnumRenewalIntervalNullableWithAggregatesFilter, {nullable:true})
    renewalInterval?: EnumRenewalIntervalNullableWithAggregatesFilter;
}
