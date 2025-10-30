import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductSlug } from '../prisma/product-slug.enum';
import { ModeType } from '../prisma/mode-type.enum';
import { PlanCreateNestedManyWithoutProductInput } from '../plan/plan-create-nested-many-without-product.input';

@InputType()
export class ProductCreateInput {

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

    @Field(() => PlanCreateNestedManyWithoutProductInput, {nullable:true})
    plans?: PlanCreateNestedManyWithoutProductInput;
}
