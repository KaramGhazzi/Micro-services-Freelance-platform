import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CheckoutUncheckedUpdateManyWithoutCompanyNestedInput } from '../checkout/checkout-unchecked-update-many-without-company-nested.input';

@InputType()
export class ExternalProviderCompanyUncheckedUpdateInput {

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => CheckoutUncheckedUpdateManyWithoutCompanyNestedInput, {nullable:true})
    checkout?: CheckoutUncheckedUpdateManyWithoutCompanyNestedInput;
}
