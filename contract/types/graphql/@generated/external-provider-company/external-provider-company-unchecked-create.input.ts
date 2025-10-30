import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CheckoutUncheckedCreateNestedManyWithoutCompanyInput } from '../checkout/checkout-unchecked-create-nested-many-without-company.input';

@InputType()
export class ExternalProviderCompanyUncheckedCreateInput {

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => CheckoutUncheckedCreateNestedManyWithoutCompanyInput, {nullable:true})
    checkout?: CheckoutUncheckedCreateNestedManyWithoutCompanyInput;
}
