import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { Type } from 'class-transformer';
import { CheckoutUpdateWithoutCompanyInput } from './checkout-update-without-company.input';

@InputType()
export class CheckoutUpdateWithWhereUniqueWithoutCompanyInput {

    @Field(() => CheckoutWhereUniqueInput, {nullable:false})
    @Type(() => CheckoutWhereUniqueInput)
    where!: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;

    @Field(() => CheckoutUpdateWithoutCompanyInput, {nullable:false})
    @Type(() => CheckoutUpdateWithoutCompanyInput)
    data!: CheckoutUpdateWithoutCompanyInput;
}
