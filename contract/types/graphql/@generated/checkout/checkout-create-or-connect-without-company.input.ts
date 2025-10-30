import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { Type } from 'class-transformer';
import { CheckoutCreateWithoutCompanyInput } from './checkout-create-without-company.input';

@InputType()
export class CheckoutCreateOrConnectWithoutCompanyInput {

    @Field(() => CheckoutWhereUniqueInput, {nullable:false})
    @Type(() => CheckoutWhereUniqueInput)
    where!: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;

    @Field(() => CheckoutCreateWithoutCompanyInput, {nullable:false})
    @Type(() => CheckoutCreateWithoutCompanyInput)
    create!: CheckoutCreateWithoutCompanyInput;
}
