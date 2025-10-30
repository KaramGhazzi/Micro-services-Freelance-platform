import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput } from '../external-provider-company/external-provider-company-update-one-required-without-checkout-nested.input';

@InputType()
export class CheckoutUpdateWithoutPlanInput {

    @Field(() => Int, {nullable:true})
    userId?: number;

    @Field(() => String, {nullable:true})
    token?: string;

    @Field(() => String, {nullable:true})
    sessionId?: string;

    @Field(() => ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput, {nullable:true})
    company?: ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput;
}
