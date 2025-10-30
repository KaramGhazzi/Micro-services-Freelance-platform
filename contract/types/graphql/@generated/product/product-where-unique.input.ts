import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ProductSlug } from '../prisma/product-slug.enum';
import { ProductWhereInput } from './product-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumModeTypeNullableFilter } from '../prisma/enum-mode-type-nullable-filter.input';
import { PlanListRelationFilter } from '../plan/plan-list-relation-filter.input';

@InputType()
export class ProductWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => ProductSlug, {nullable:true})
    slug?: keyof typeof ProductSlug;

    @Field(() => [ProductWhereInput], {nullable:true})
    AND?: Array<ProductWhereInput>;

    @Field(() => [ProductWhereInput], {nullable:true})
    OR?: Array<ProductWhereInput>;

    @Field(() => [ProductWhereInput], {nullable:true})
    NOT?: Array<ProductWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    externalProviderId?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    externalProviderSync?: BoolFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    description?: StringFilter;

    @Field(() => EnumModeTypeNullableFilter, {nullable:true})
    modeType?: EnumModeTypeNullableFilter;

    @Field(() => PlanListRelationFilter, {nullable:true})
    plans?: PlanListRelationFilter;
}
