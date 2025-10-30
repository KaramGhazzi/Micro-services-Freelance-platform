import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { PlanUpdateOneRequiredWithoutCheckoutsNestedInput } from '../plan/plan-update-one-required-without-checkouts-nested.input';

@InputType()
export class CheckoutUpdateWithoutCompanyInput {

    @Field(() => Int, {nullable:true})
    userId?: number;

    @Field(() => String, {nullable:true})
    token?: string;

    @Field(() => String, {nullable:true})
    sessionId?: string;

    @Field(() => PlanUpdateOneRequiredWithoutCheckoutsNestedInput, {nullable:true})
    plan?: PlanUpdateOneRequiredWithoutCheckoutsNestedInput;
}
