import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CheckoutWhereInput } from './checkout-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCheckoutArgs {

    @Field(() => CheckoutWhereInput, {nullable:true})
    @Type(() => CheckoutWhereInput)
    where?: CheckoutWhereInput;
}
