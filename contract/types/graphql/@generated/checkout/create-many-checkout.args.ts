import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CheckoutCreateManyInput } from './checkout-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCheckoutArgs {

    @Field(() => [CheckoutCreateManyInput], {nullable:false})
    @Type(() => CheckoutCreateManyInput)
    data!: Array<CheckoutCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
