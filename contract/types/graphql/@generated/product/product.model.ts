import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { ProductSlug } from '../prisma/product-slug.enum';
import { ModeType } from '../prisma/mode-type.enum';
import { Plan } from '../plan/plan.model';
import { ProductCount } from './product-count.output';

@ObjectType()
export class Product {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:true})
    externalProviderId!: string | null;

    @Field(() => Boolean, {nullable:false})
    externalProviderSync!: boolean;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => ProductSlug, {nullable:false})
    slug!: keyof typeof ProductSlug;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => ModeType, {nullable:true})
    modeType!: keyof typeof ModeType | null;

    @Field(() => [Plan], {nullable:true})
    plans?: Array<Plan>;

    @Field(() => ProductCount, {nullable:false})
    _count?: ProductCount;
}
