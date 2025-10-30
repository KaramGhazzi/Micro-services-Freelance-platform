import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from '../prisma/legacy-invoice-item-code.enum';
import { LegacyInvoiceUpdateOneRequiredWithoutLegacyInvoiceItemsNestedInput } from '../legacy-invoice/legacy-invoice-update-one-required-without-legacy-invoice-items-nested.input';

@InputType()
export class LegacyInvoiceItemUpdateInput {

    @Field(() => Int, {nullable:true})
    contractId?: number;

    @Field(() => LegacyInvoiceItemCode, {nullable:true})
    invoiceItemCode?: keyof typeof LegacyInvoiceItemCode;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Date, {nullable:true})
    startDate?: Date | string;

    @Field(() => Date, {nullable:true})
    endDate?: Date | string;

    @Field(() => Int, {nullable:true})
    amount?: number;

    @Field(() => Int, {nullable:true})
    price?: number;

    @Field(() => Int, {nullable:true})
    taxPercent?: number;

    @Field(() => LegacyInvoiceUpdateOneRequiredWithoutLegacyInvoiceItemsNestedInput, {nullable:true})
    legacyInvoice?: LegacyInvoiceUpdateOneRequiredWithoutLegacyInvoiceItemsNestedInput;
}
