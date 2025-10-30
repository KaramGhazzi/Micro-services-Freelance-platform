import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ProductSlug } from '../prisma/product-slug.enum';
import { ModeType } from '../prisma/mode-type.enum';

@InputType()
export class ProductCreateManyInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => Boolean, {nullable:false})
    externalProviderSync!: boolean;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => ProductSlug, {nullable:false})
    slug!: keyof typeof ProductSlug;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => ModeType, {nullable:true})
    modeType?: keyof typeof ModeType;
}
