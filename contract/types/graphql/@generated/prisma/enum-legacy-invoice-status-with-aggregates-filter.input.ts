import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceStatus } from './legacy-invoice-status.enum';
import { NestedEnumLegacyInvoiceStatusWithAggregatesFilter } from './nested-enum-legacy-invoice-status-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumLegacyInvoiceStatusFilter } from './nested-enum-legacy-invoice-status-filter.input';

@InputType()
export class EnumLegacyInvoiceStatusWithAggregatesFilter {

    @Field(() => LegacyInvoiceStatus, {nullable:true})
    equals?: keyof typeof LegacyInvoiceStatus;

    @Field(() => [LegacyInvoiceStatus], {nullable:true})
    in?: Array<keyof typeof LegacyInvoiceStatus>;

    @Field(() => [LegacyInvoiceStatus], {nullable:true})
    notIn?: Array<keyof typeof LegacyInvoiceStatus>;

    @Field(() => NestedEnumLegacyInvoiceStatusWithAggregatesFilter, {nullable:true})
    not?: NestedEnumLegacyInvoiceStatusWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumLegacyInvoiceStatusFilter, {nullable:true})
    _min?: NestedEnumLegacyInvoiceStatusFilter;

    @Field(() => NestedEnumLegacyInvoiceStatusFilter, {nullable:true})
    _max?: NestedEnumLegacyInvoiceStatusFilter;
}
