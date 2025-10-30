import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CheckoutCreateInput } from './checkout-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCheckoutArgs {

    @Field(() => CheckoutCreateInput, {nullable:false})
    @Type(() => CheckoutCreateInput)
    data!: CheckoutCreateInput;
}
