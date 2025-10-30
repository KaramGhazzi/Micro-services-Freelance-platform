import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ProductSlug } from '../prisma/product-slug.enum';
import { ModeType } from '../prisma/mode-type.enum';
import { ProductCountAggregate } from './product-count-aggregate.output';
import { ProductAvgAggregate } from './product-avg-aggregate.output';
import { ProductSumAggregate } from './product-sum-aggregate.output';
import { ProductMinAggregate } from './product-min-aggregate.output';
import { ProductMaxAggregate } from './product-max-aggregate.output';

@ObjectType()
export class ProductGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

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

    @Field(() => ProductCountAggregate, {nullable:true})
    _count?: ProductCountAggregate;

    @Field(() => ProductAvgAggregate, {nullable:true})
    _avg?: ProductAvgAggregate;

    @Field(() => ProductSumAggregate, {nullable:true})
    _sum?: ProductSumAggregate;

    @Field(() => ProductMinAggregate, {nullable:true})
    _min?: ProductMinAggregate;

    @Field(() => ProductMaxAggregate, {nullable:true})
    _max?: ProductMaxAggregate;
}
