import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ProductSlug } from '../prisma/product-slug.enum';
import { ModeType } from '../prisma/mode-type.enum';
import { PlanUncheckedUpdateManyWithoutProductNestedInput } from '../plan/plan-unchecked-update-many-without-product-nested.input';

@InputType()
export class ProductUncheckedUpdateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

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

    @Field(() => PlanUncheckedUpdateManyWithoutProductNestedInput, {nullable:true})
    plans?: PlanUncheckedUpdateManyWithoutProductNestedInput;
}
