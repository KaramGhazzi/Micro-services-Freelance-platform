import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput } from '../external-provider-company/external-provider-company-update-one-required-without-checkout-nested.input';
import { PlanUpdateOneRequiredWithoutCheckoutsNestedInput } from '../plan/plan-update-one-required-without-checkouts-nested.input';

@InputType()
export class CheckoutUpdateInput {

    @Field(() => Int, {nullable:true})
    userId?: number;

    @Field(() => String, {nullable:true})
    token?: string;

    @Field(() => String, {nullable:true})
    sessionId?: string;

    @Field(() => ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput, {nullable:true})
    company?: ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput;

    @Field(() => PlanUpdateOneRequiredWithoutCheckoutsNestedInput, {nullable:true})
    plan?: PlanUpdateOneRequiredWithoutCheckoutsNestedInput;
}
