import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductWhereInput } from './product-where.input';
import { Type } from 'class-transformer';
import { ProductUpdateWithoutPlansInput } from './product-update-without-plans.input';

@InputType()
export class ProductUpdateToOneWithWhereWithoutPlansInput {

    @Field(() => ProductWhereInput, {nullable:true})
    @Type(() => ProductWhereInput)
    where?: ProductWhereInput;

    @Field(() => ProductUpdateWithoutPlansInput, {nullable:false})
    @Type(() => ProductUpdateWithoutPlansInput)
    data!: ProductUpdateWithoutPlansInput;
}
