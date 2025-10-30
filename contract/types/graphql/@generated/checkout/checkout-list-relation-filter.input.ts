import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutWhereInput } from './checkout-where.input';

@InputType()
export class CheckoutListRelationFilter {

    @Field(() => CheckoutWhereInput, {nullable:true})
    every?: CheckoutWhereInput;

    @Field(() => CheckoutWhereInput, {nullable:true})
    some?: CheckoutWhereInput;

    @Field(() => CheckoutWhereInput, {nullable:true})
    none?: CheckoutWhereInput;
}
