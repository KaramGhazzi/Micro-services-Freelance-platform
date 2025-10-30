import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CheckoutUpdateManyMutationInput } from './checkout-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CheckoutWhereInput } from './checkout-where.input';

@ArgsType()
export class UpdateManyCheckoutArgs {

    @Field(() => CheckoutUpdateManyMutationInput, {nullable:false})
    @Type(() => CheckoutUpdateManyMutationInput)
    data!: CheckoutUpdateManyMutationInput;

    @Field(() => CheckoutWhereInput, {nullable:true})
    @Type(() => CheckoutWhereInput)
    where?: CheckoutWhereInput;
}
