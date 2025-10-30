import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { EnumUsageTypeWithAggregatesFilter } from '../prisma/enum-usage-type-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { EnumIntervalNullableWithAggregatesFilter } from '../prisma/enum-interval-nullable-with-aggregates-filter.input';
import { EnumRenewalIntervalNullableWithAggregatesFilter } from '../prisma/enum-renewal-interval-nullable-with-aggregates-filter.input';

@InputType()
export class PlanScalarWhereWithAggregatesInput {

    @Field(() => [PlanScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<PlanScalarWhereWithAggregatesInput>;

    @Field(() => [PlanScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<PlanScalarWhereWithAggregatesInput>;

    @Field(() => [PlanScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<PlanScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    externalProviderId?: StringNullableWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    externalProviderSync?: BoolWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    externalProviderPaymentMethodId?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    slug?: StringNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    productId?: IntWithAggregatesFilter;

    @Field(() => EnumUsageTypeWithAggregatesFilter, {nullable:true})
    usageType?: EnumUsageTypeWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    usageAmount?: IntNullableWithAggregatesFilter;

    @Field(() => EnumIntervalNullableWithAggregatesFilter, {nullable:true})
    usageInterval?: EnumIntervalNullableWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    usageIntervalCount?: IntNullableWithAggregatesFilter;

    @Field(() => EnumRenewalIntervalNullableWithAggregatesFilter, {nullable:true})
    renewalInterval?: EnumRenewalIntervalNullableWithAggregatesFilter;
}
