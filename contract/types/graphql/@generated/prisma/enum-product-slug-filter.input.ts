import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductSlug } from './product-slug.enum';
import { NestedEnumProductSlugFilter } from './nested-enum-product-slug-filter.input';

@InputType()
export class EnumProductSlugFilter {

    @Field(() => ProductSlug, {nullable:true})
    equals?: keyof typeof ProductSlug;

    @Field(() => [ProductSlug], {nullable:true})
    in?: Array<keyof typeof ProductSlug>;

    @Field(() => [ProductSlug], {nullable:true})
    notIn?: Array<keyof typeof ProductSlug>;

    @Field(() => NestedEnumProductSlugFilter, {nullable:true})
    not?: NestedEnumProductSlugFilter;
}
