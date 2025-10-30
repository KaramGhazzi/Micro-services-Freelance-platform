import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutCreateWithoutPlanInput } from './checkout-create-without-plan.input';
import { Type } from 'class-transformer';
import { CheckoutCreateOrConnectWithoutPlanInput } from './checkout-create-or-connect-without-plan.input';
import { CheckoutUpsertWithWhereUniqueWithoutPlanInput } from './checkout-upsert-with-where-unique-without-plan.input';
import { CheckoutCreateManyPlanInputEnvelope } from './checkout-create-many-plan-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { CheckoutUpdateWithWhereUniqueWithoutPlanInput } from './checkout-update-with-where-unique-without-plan.input';
import { CheckoutUpdateManyWithWhereWithoutPlanInput } from './checkout-update-many-with-where-without-plan.input';
import { CheckoutScalarWhereInput } from './checkout-scalar-where.input';

@InputType()
export class CheckoutUncheckedUpdateManyWithoutPlanNestedInput {

    @Field(() => [CheckoutCreateWithoutPlanInput], {nullable:true})
    @Type(() => CheckoutCreateWithoutPlanInput)
    create?: Array<CheckoutCreateWithoutPlanInput>;

    @Field(() => [CheckoutCreateOrConnectWithoutPlanInput], {nullable:true})
    @Type(() => CheckoutCreateOrConnectWithoutPlanInput)
    connectOrCreate?: Array<CheckoutCreateOrConnectWithoutPlanInput>;

    @Field(() => [CheckoutUpsertWithWhereUniqueWithoutPlanInput], {nullable:true})
    @Type(() => CheckoutUpsertWithWhereUniqueWithoutPlanInput)
    upsert?: Array<CheckoutUpsertWithWhereUniqueWithoutPlanInput>;

    @Field(() => CheckoutCreateManyPlanInputEnvelope, {nullable:true})
    @Type(() => CheckoutCreateManyPlanInputEnvelope)
    createMany?: CheckoutCreateManyPlanInputEnvelope;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutUpdateWithWhereUniqueWithoutPlanInput], {nullable:true})
    @Type(() => CheckoutUpdateWithWhereUniqueWithoutPlanInput)
    update?: Array<CheckoutUpdateWithWhereUniqueWithoutPlanInput>;

    @Field(() => [CheckoutUpdateManyWithWhereWithoutPlanInput], {nullable:true})
    @Type(() => CheckoutUpdateManyWithWhereWithoutPlanInput)
    updateMany?: Array<CheckoutUpdateManyWithWhereWithoutPlanInput>;

    @Field(() => [CheckoutScalarWhereInput], {nullable:true})
    @Type(() => CheckoutScalarWhereInput)
    deleteMany?: Array<CheckoutScalarWhereInput>;
}
