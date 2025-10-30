import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { EnumUsageTypeFilter } from '../prisma/enum-usage-type-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { EnumIntervalNullableFilter } from '../prisma/enum-interval-nullable-filter.input';
import { EnumRenewalIntervalNullableFilter } from '../prisma/enum-renewal-interval-nullable-filter.input';

@InputType()
export class PlanScalarWhereInput {

    @Field(() => [PlanScalarWhereInput], {nullable:true})
    AND?: Array<PlanScalarWhereInput>;

    @Field(() => [PlanScalarWhereInput], {nullable:true})
    OR?: Array<PlanScalarWhereInput>;

    @Field(() => [PlanScalarWhereInput], {nullable:true})
    NOT?: Array<PlanScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    externalProviderId?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    externalProviderSync?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    externalProviderPaymentMethodId?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    slug?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    productId?: IntFilter;

    @Field(() => EnumUsageTypeFilter, {nullable:true})
    usageType?: EnumUsageTypeFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    usageAmount?: IntNullableFilter;

    @Field(() => EnumIntervalNullableFilter, {nullable:true})
    usageInterval?: EnumIntervalNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    usageIntervalCount?: IntNullableFilter;

    @Field(() => EnumRenewalIntervalNullableFilter, {nullable:true})
    renewalInterval?: EnumRenewalIntervalNullableFilter;
}
