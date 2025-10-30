import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutCreateWithoutPlanInput } from './checkout-create-without-plan.input';
import { Type } from 'class-transformer';
import { CheckoutCreateOrConnectWithoutPlanInput } from './checkout-create-or-connect-without-plan.input';
import { CheckoutCreateManyPlanInputEnvelope } from './checkout-create-many-plan-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';

@InputType()
export class CheckoutUncheckedCreateNestedManyWithoutPlanInput {

    @Field(() => [CheckoutCreateWithoutPlanInput], {nullable:true})
    @Type(() => CheckoutCreateWithoutPlanInput)
    create?: Array<CheckoutCreateWithoutPlanInput>;

    @Field(() => [CheckoutCreateOrConnectWithoutPlanInput], {nullable:true})
    @Type(() => CheckoutCreateOrConnectWithoutPlanInput)
    connectOrCreate?: Array<CheckoutCreateOrConnectWithoutPlanInput>;

    @Field(() => CheckoutCreateManyPlanInputEnvelope, {nullable:true})
    @Type(() => CheckoutCreateManyPlanInputEnvelope)
    createMany?: CheckoutCreateManyPlanInputEnvelope;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;
}
