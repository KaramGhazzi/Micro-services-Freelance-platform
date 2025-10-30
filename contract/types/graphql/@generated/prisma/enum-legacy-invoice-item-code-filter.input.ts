import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from './legacy-invoice-item-code.enum';
import { NestedEnumLegacyInvoiceItemCodeFilter } from './nested-enum-legacy-invoice-item-code-filter.input';

@InputType()
export class EnumLegacyInvoiceItemCodeFilter {

    @Field(() => LegacyInvoiceItemCode, {nullable:true})
    equals?: keyof typeof LegacyInvoiceItemCode;

    @Field(() => [LegacyInvoiceItemCode], {nullable:true})
    in?: Array<keyof typeof LegacyInvoiceItemCode>;

    @Field(() => [LegacyInvoiceItemCode], {nullable:true})
    notIn?: Array<keyof typeof LegacyInvoiceItemCode>;

    @Field(() => NestedEnumLegacyInvoiceItemCodeFilter, {nullable:true})
    not?: NestedEnumLegacyInvoiceItemCodeFilter;
}
