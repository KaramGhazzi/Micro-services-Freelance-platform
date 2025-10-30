import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CheckoutUpdateInput } from './checkout-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';

@ArgsType()
export class UpdateOneCheckoutArgs {

    @Field(() => CheckoutUpdateInput, {nullable:false})
    @Type(() => CheckoutUpdateInput)
    data!: CheckoutUpdateInput;

    @Field(() => CheckoutWhereUniqueInput, {nullable:false})
    @Type(() => CheckoutWhereUniqueInput)
    where!: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;
}
