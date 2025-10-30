import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { EnumLegacyInvoiceStatusFilter } from '../prisma/enum-legacy-invoice-status-filter.input';
import { LegacyInvoiceItemListRelationFilter } from '../legacy-invoice-item/legacy-invoice-item-list-relation-filter.input';

@InputType()
export class LegacyInvoiceWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [LegacyInvoiceWhereInput], {nullable:true})
    AND?: Array<LegacyInvoiceWhereInput>;

    @Field(() => [LegacyInvoiceWhereInput], {nullable:true})
    OR?: Array<LegacyInvoiceWhereInput>;

    @Field(() => [LegacyInvoiceWhereInput], {nullable:true})
    NOT?: Array<LegacyInvoiceWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    companyId?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    firstName?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    lastName?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    addressLine1?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    addressLine2?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    postalCode?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    city?: StringNullableFilter;

    @Field(() => EnumLegacyInvoiceStatusFilter, {nullable:true})
    status?: EnumLegacyInvoiceStatusFilter;

    @Field(() => LegacyInvoiceItemListRelationFilter, {nullable:true})
    legacyInvoiceItems?: LegacyInvoiceItemListRelationFilter;
}
