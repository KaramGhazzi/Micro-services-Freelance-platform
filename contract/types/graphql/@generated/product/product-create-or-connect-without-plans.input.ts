import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ProductWhereUniqueInput } from './product-where-unique.input';
import { Type } from 'class-transformer';
import { ProductCreateWithoutPlansInput } from './product-create-without-plans.input';

@InputType()
export class ProductCreateOrConnectWithoutPlansInput {

    @Field(() => ProductWhereUniqueInput, {nullable:false})
    @Type(() => ProductWhereUniqueInput)
    where!: Prisma.AtLeast<ProductWhereUniqueInput, 'id' | 'slug'>;

    @Field(() => ProductCreateWithoutPlansInput, {nullable:false})
    @Type(() => ProductCreateWithoutPlansInput)
    create!: ProductCreateWithoutPlansInput;
}
