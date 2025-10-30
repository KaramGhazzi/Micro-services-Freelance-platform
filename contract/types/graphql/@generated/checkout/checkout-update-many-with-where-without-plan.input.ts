import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutScalarWhereInput } from './checkout-scalar-where.input';
import { Type } from 'class-transformer';
import { CheckoutUpdateManyMutationInput } from './checkout-update-many-mutation.input';

@InputType()
export class CheckoutUpdateManyWithWhereWithoutPlanInput {

    @Field(() => CheckoutScalarWhereInput, {nullable:false})
    @Type(() => CheckoutScalarWhereInput)
    where!: CheckoutScalarWhereInput;

    @Field(() => CheckoutUpdateManyMutationInput, {nullable:false})
    @Type(() => CheckoutUpdateManyMutationInput)
    data!: CheckoutUpdateManyMutationInput;
}
