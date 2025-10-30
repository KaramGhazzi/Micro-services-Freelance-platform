import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductSlug } from './product-slug.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumProductSlugFilter } from './nested-enum-product-slug-filter.input';

@InputType()
export class NestedEnumProductSlugWithAggregatesFilter {

    @Field(() => ProductSlug, {nullable:true})
    equals?: keyof typeof ProductSlug;

    @Field(() => [ProductSlug], {nullable:true})
    in?: Array<keyof typeof ProductSlug>;

    @Field(() => [ProductSlug], {nullable:true})
    notIn?: Array<keyof typeof ProductSlug>;

    @Field(() => NestedEnumProductSlugWithAggregatesFilter, {nullable:true})
    not?: NestedEnumProductSlugWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumProductSlugFilter, {nullable:true})
    _min?: NestedEnumProductSlugFilter;

    @Field(() => NestedEnumProductSlugFilter, {nullable:true})
    _max?: NestedEnumProductSlugFilter;
}
