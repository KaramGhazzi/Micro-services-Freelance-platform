import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from './legacy-invoice-item-code.enum';
import { NestedEnumLegacyInvoiceItemCodeWithAggregatesFilter } from './nested-enum-legacy-invoice-item-code-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumLegacyInvoiceItemCodeFilter } from './nested-enum-legacy-invoice-item-code-filter.input';

@InputType()
export class EnumLegacyInvoiceItemCodeWithAggregatesFilter {

    @Field(() => LegacyInvoiceItemCode, {nullable:true})
    equals?: keyof typeof LegacyInvoiceItemCode;

    @Field(() => [LegacyInvoiceItemCode], {nullable:true})
    in?: Array<keyof typeof LegacyInvoiceItemCode>;

    @Field(() => [LegacyInvoiceItemCode], {nullable:true})
    notIn?: Array<keyof typeof LegacyInvoiceItemCode>;

    @Field(() => NestedEnumLegacyInvoiceItemCodeWithAggregatesFilter, {nullable:true})
    not?: NestedEnumLegacyInvoiceItemCodeWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumLegacyInvoiceItemCodeFilter, {nullable:true})
    _min?: NestedEnumLegacyInvoiceItemCodeFilter;

    @Field(() => NestedEnumLegacyInvoiceItemCodeFilter, {nullable:true})
    _max?: NestedEnumLegacyInvoiceItemCodeFilter;
}
