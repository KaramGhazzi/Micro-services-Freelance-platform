import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { EnumLegacyInvoiceItemCodeFilter } from '../prisma/enum-legacy-invoice-item-code-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { LegacyInvoiceRelationFilter } from '../legacy-invoice/legacy-invoice-relation-filter.input';

@InputType()
export class LegacyInvoiceItemWhereInput {

    @Field(() => [LegacyInvoiceItemWhereInput], {nullable:true})
    AND?: Array<LegacyInvoiceItemWhereInput>;

    @Field(() => [LegacyInvoiceItemWhereInput], {nullable:true})
    OR?: Array<LegacyInvoiceItemWhereInput>;

    @Field(() => [LegacyInvoiceItemWhereInput], {nullable:true})
    NOT?: Array<LegacyInvoiceItemWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    legacyInvoiceId?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    contractId?: IntNullableFilter;

    @Field(() => EnumLegacyInvoiceItemCodeFilter, {nullable:true})
    invoiceItemCode?: EnumLegacyInvoiceItemCodeFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    startDate?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    endDate?: DateTimeNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    amount?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    price?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    taxPercent?: IntFilter;

    @Field(() => LegacyInvoiceRelationFilter, {nullable:true})
    legacyInvoice?: LegacyInvoiceRelationFilter;
}
