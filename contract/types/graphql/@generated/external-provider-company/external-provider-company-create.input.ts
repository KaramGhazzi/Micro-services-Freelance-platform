import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CheckoutCreateNestedManyWithoutCompanyInput } from '../checkout/checkout-create-nested-many-without-company.input';

@InputType()
export class ExternalProviderCompanyCreateInput {

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => CheckoutCreateNestedManyWithoutCompanyInput, {nullable:true})
    checkout?: CheckoutCreateNestedManyWithoutCompanyInput;
}
