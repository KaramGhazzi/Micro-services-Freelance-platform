import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';

@InputType()
export class ExternalProviderCompanyScalarWhereWithAggregatesInput {

    @Field(() => [ExternalProviderCompanyScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ExternalProviderCompanyScalarWhereWithAggregatesInput>;

    @Field(() => [ExternalProviderCompanyScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ExternalProviderCompanyScalarWhereWithAggregatesInput>;

    @Field(() => [ExternalProviderCompanyScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ExternalProviderCompanyScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    companyId?: IntWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    externalProviderId?: StringNullableWithAggregatesFilter;
}
