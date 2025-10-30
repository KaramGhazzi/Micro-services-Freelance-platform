import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CheckoutWhereInput } from './checkout-where.input';
import { Type } from 'class-transformer';
import { CheckoutOrderByWithRelationInput } from './checkout-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CheckoutScalarFieldEnum } from './checkout-scalar-field.enum';

@ArgsType()
export class FindFirstCheckoutOrThrowArgs {

    @Field(() => CheckoutWhereInput, {nullable:true})
    @Type(() => CheckoutWhereInput)
    where?: CheckoutWhereInput;

    @Field(() => [CheckoutOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CheckoutOrderByWithRelationInput>;

    @Field(() => CheckoutWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CheckoutScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CheckoutScalarFieldEnum>;
}
