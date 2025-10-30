import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CheckoutUpdateManyWithoutCompanyNestedInput } from '../checkout/checkout-update-many-without-company-nested.input';

@InputType()
export class ExternalProviderCompanyUpdateInput {

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => CheckoutUpdateManyWithoutCompanyNestedInput, {nullable:true})
    checkout?: CheckoutUpdateManyWithoutCompanyNestedInput;
}
