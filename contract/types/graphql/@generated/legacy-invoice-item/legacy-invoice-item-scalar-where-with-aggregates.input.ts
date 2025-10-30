import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { EnumLegacyInvoiceItemCodeWithAggregatesFilter } from '../prisma/enum-legacy-invoice-item-code-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';

@InputType()
export class LegacyInvoiceItemScalarWhereWithAggregatesInput {

    @Field(() => [LegacyInvoiceItemScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<LegacyInvoiceItemScalarWhereWithAggregatesInput>;

    @Field(() => [LegacyInvoiceItemScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<LegacyInvoiceItemScalarWhereWithAggregatesInput>;

    @Field(() => [LegacyInvoiceItemScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<LegacyInvoiceItemScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    legacyInvoiceId?: IntWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    contractId?: IntNullableWithAggregatesFilter;

    @Field(() => EnumLegacyInvoiceItemCodeWithAggregatesFilter, {nullable:true})
    invoiceItemCode?: EnumLegacyInvoiceItemCodeWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    startDate?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    endDate?: DateTimeNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    amount?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    price?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    taxPercent?: IntWithAggregatesFilter;
}
