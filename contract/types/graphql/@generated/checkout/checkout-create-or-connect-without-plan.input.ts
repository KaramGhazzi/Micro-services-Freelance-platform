import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { Type } from 'class-transformer';
import { CheckoutCreateWithoutPlanInput } from './checkout-create-without-plan.input';

@InputType()
export class CheckoutCreateOrConnectWithoutPlanInput {

    @Field(() => CheckoutWhereUniqueInput, {nullable:false})
    @Type(() => CheckoutWhereUniqueInput)
    where!: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;

    @Field(() => CheckoutCreateWithoutPlanInput, {nullable:false})
    @Type(() => CheckoutCreateWithoutPlanInput)
    create!: CheckoutCreateWithoutPlanInput;
}
