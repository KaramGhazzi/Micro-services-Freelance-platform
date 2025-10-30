import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductCreateWithoutPlansInput } from './product-create-without-plans.input';
import { Type } from 'class-transformer';
import { ProductCreateOrConnectWithoutPlansInput } from './product-create-or-connect-without-plans.input';
import { ProductUpsertWithoutPlansInput } from './product-upsert-without-plans.input';
import { Prisma } from '@freelance/contract/client';
import { ProductWhereUniqueInput } from './product-where-unique.input';
import { ProductUpdateToOneWithWhereWithoutPlansInput } from './product-update-to-one-with-where-without-plans.input';

@InputType()
export class ProductUpdateOneRequiredWithoutPlansNestedInput {

    @Field(() => ProductCreateWithoutPlansInput, {nullable:true})
    @Type(() => ProductCreateWithoutPlansInput)
    create?: ProductCreateWithoutPlansInput;

    @Field(() => ProductCreateOrConnectWithoutPlansInput, {nullable:true})
    @Type(() => ProductCreateOrConnectWithoutPlansInput)
    connectOrCreate?: ProductCreateOrConnectWithoutPlansInput;

    @Field(() => ProductUpsertWithoutPlansInput, {nullable:true})
    @Type(() => ProductUpsertWithoutPlansInput)
    upsert?: ProductUpsertWithoutPlansInput;

    @Field(() => ProductWhereUniqueInput, {nullable:true})
    @Type(() => ProductWhereUniqueInput)
    connect?: Prisma.AtLeast<ProductWhereUniqueInput, 'id' | 'slug'>;

    @Field(() => ProductUpdateToOneWithWhereWithoutPlansInput, {nullable:true})
    @Type(() => ProductUpdateToOneWithWhereWithoutPlansInput)
    update?: ProductUpdateToOneWithWhereWithoutPlansInput;
}
