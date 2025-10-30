import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { CheckoutListRelationFilter } from '../checkout/checkout-list-relation-filter.input';

@InputType()
export class ExternalProviderCompanyWhereInput {

    @Field(() => [ExternalProviderCompanyWhereInput], {nullable:true})
    AND?: Array<ExternalProviderCompanyWhereInput>;

    @Field(() => [ExternalProviderCompanyWhereInput], {nullable:true})
    OR?: Array<ExternalProviderCompanyWhereInput>;

    @Field(() => [ExternalProviderCompanyWhereInput], {nullable:true})
    NOT?: Array<ExternalProviderCompanyWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    companyId?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    externalProviderId?: StringNullableFilter;

    @Field(() => CheckoutListRelationFilter, {nullable:true})
    checkout?: CheckoutListRelationFilter;
}
