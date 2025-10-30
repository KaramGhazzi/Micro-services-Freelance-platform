import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';
import { CheckoutListRelationFilter } from '../checkout/checkout-list-relation-filter.input';

@InputType()
export class ExternalProviderCompanyWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;

    @Field(() => [ExternalProviderCompanyWhereInput], {nullable:true})
    AND?: Array<ExternalProviderCompanyWhereInput>;

    @Field(() => [ExternalProviderCompanyWhereInput], {nullable:true})
    OR?: Array<ExternalProviderCompanyWhereInput>;

    @Field(() => [ExternalProviderCompanyWhereInput], {nullable:true})
    NOT?: Array<ExternalProviderCompanyWhereInput>;

    @Field(() => CheckoutListRelationFilter, {nullable:true})
    checkout?: CheckoutListRelationFilter;
}
