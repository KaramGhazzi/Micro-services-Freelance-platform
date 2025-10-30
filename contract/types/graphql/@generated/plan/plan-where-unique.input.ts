import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { PlanWhereInput } from './plan-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumUsageTypeFilter } from '../prisma/enum-usage-type-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { EnumIntervalNullableFilter } from '../prisma/enum-interval-nullable-filter.input';
import { EnumRenewalIntervalNullableFilter } from '../prisma/enum-renewal-interval-nullable-filter.input';
import { ProductRelationFilter } from '../product/product-relation-filter.input';
import { ContractListRelationFilter } from '../contract/contract-list-relation-filter.input';
import { CheckoutListRelationFilter } from '../checkout/checkout-list-relation-filter.input';

@InputType()
export class PlanWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [PlanWhereInput], {nullable:true})
    AND?: Array<PlanWhereInput>;

    @Field(() => [PlanWhereInput], {nullable:true})
    OR?: Array<PlanWhereInput>;

    @Field(() => [PlanWhereInput], {nullable:true})
    NOT?: Array<PlanWhereInput>;

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

    @Field(() => ProductRelationFilter, {nullable:true})
    product?: ProductRelationFilter;

    @Field(() => ContractListRelationFilter, {nullable:true})
    contracts?: ContractListRelationFilter;

    @Field(() => CheckoutListRelationFilter, {nullable:true})
    checkouts?: CheckoutListRelationFilter;
}
