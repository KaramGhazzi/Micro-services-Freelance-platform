import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from '../prisma/legacy-invoice-item-code.enum';
import { LegacyInvoiceCreateNestedOneWithoutLegacyInvoiceItemsInput } from '../legacy-invoice/legacy-invoice-create-nested-one-without-legacy-invoice-items.input';

@InputType()
export class LegacyInvoiceItemCreateInput {

    @Field(() => Int, {nullable:true})
    contractId?: number;

    @Field(() => LegacyInvoiceItemCode, {nullable:false})
    invoiceItemCode!: keyof typeof LegacyInvoiceItemCode;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Date, {nullable:true})
    startDate?: Date | string;

    @Field(() => Date, {nullable:true})
    endDate?: Date | string;

    @Field(() => Int, {nullable:false})
    amount!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:true})
    taxPercent?: number;

    @Field(() => LegacyInvoiceCreateNestedOneWithoutLegacyInvoiceItemsInput, {nullable:false})
    legacyInvoice!: LegacyInvoiceCreateNestedOneWithoutLegacyInvoiceItemsInput;
}
