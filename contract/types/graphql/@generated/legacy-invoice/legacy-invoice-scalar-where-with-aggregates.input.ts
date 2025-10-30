import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { EnumLegacyInvoiceStatusWithAggregatesFilter } from '../prisma/enum-legacy-invoice-status-with-aggregates-filter.input';

@InputType()
export class LegacyInvoiceScalarWhereWithAggregatesInput {

    @Field(() => [LegacyInvoiceScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<LegacyInvoiceScalarWhereWithAggregatesInput>;

    @Field(() => [LegacyInvoiceScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<LegacyInvoiceScalarWhereWithAggregatesInput>;

    @Field(() => [LegacyInvoiceScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<LegacyInvoiceScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    companyId?: IntWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    firstName?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    lastName?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    addressLine1?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    addressLine2?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    postalCode?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    city?: StringNullableWithAggregatesFilter;

    @Field(() => EnumLegacyInvoiceStatusWithAggregatesFilter, {nullable:true})
    status?: EnumLegacyInvoiceStatusWithAggregatesFilter;
}
