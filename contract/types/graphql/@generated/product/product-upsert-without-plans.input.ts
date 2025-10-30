import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductUpdateWithoutPlansInput } from './product-update-without-plans.input';
import { Type } from 'class-transformer';
import { ProductCreateWithoutPlansInput } from './product-create-without-plans.input';
import { ProductWhereInput } from './product-where.input';

@InputType()
export class ProductUpsertWithoutPlansInput {

    @Field(() => ProductUpdateWithoutPlansInput, {nullable:false})
    @Type(() => ProductUpdateWithoutPlansInput)
    update!: ProductUpdateWithoutPlansInput;

    @Field(() => ProductCreateWithoutPlansInput, {nullable:false})
    @Type(() => ProductCreateWithoutPlansInput)
    create!: ProductCreateWithoutPlansInput;

    @Field(() => ProductWhereInput, {nullable:true})
    @Type(() => ProductWhereInput)
    where?: ProductWhereInput;
}
