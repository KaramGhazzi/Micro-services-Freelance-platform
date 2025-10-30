import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueCheckoutArgs {

    @Field(() => CheckoutWhereUniqueInput, {nullable:false})
    @Type(() => CheckoutWhereUniqueInput)
    where!: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;
}
