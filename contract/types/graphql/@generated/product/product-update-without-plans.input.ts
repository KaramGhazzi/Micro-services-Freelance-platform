import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductSlug } from '../prisma/product-slug.enum';
import { ModeType } from '../prisma/mode-type.enum';

@InputType()
export class ProductUpdateWithoutPlansInput {

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => Boolean, {nullable:true})
    externalProviderSync?: boolean;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => ProductSlug, {nullable:true})
    slug?: keyof typeof ProductSlug;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => ModeType, {nullable:true})
    modeType?: keyof typeof ModeType;
}
