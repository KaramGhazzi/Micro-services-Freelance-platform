import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { PlanCreateNestedOneWithoutCheckoutsInput } from '../plan/plan-create-nested-one-without-checkouts.input';

@InputType()
export class CheckoutCreateWithoutCompanyInput {

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => String, {nullable:false})
    token!: string;

    @Field(() => String, {nullable:false})
    sessionId!: string;

    @Field(() => PlanCreateNestedOneWithoutCheckoutsInput, {nullable:false})
    plan!: PlanCreateNestedOneWithoutCheckoutsInput;
}
