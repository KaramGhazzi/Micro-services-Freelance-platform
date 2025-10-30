import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { Type } from 'class-transformer';
import { CheckoutCreateInput } from './checkout-create.input';
import { CheckoutUpdateInput } from './checkout-update.input';

@ArgsType()
export class UpsertOneCheckoutArgs {

    @Field(() => CheckoutWhereUniqueInput, {nullable:false})
    @Type(() => CheckoutWhereUniqueInput)
    where!: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;

    @Field(() => CheckoutCreateInput, {nullable:false})
    @Type(() => CheckoutCreateInput)
    create!: CheckoutCreateInput;

    @Field(() => CheckoutUpdateInput, {nullable:false})
    @Type(() => CheckoutUpdateInput)
    update!: CheckoutUpdateInput;
}
