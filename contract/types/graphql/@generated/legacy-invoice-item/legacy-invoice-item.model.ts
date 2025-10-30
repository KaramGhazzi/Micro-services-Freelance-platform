import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from '../prisma/legacy-invoice-item-code.enum';
import { LegacyInvoice } from '../legacy-invoice/legacy-invoice.model';

@ObjectType()
export class LegacyInvoiceItem {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    legacyInvoiceId!: number;

    @Field(() => Int, {nullable:true})
    contractId!: number | null;

    @Field(() => LegacyInvoiceItemCode, {nullable:false})
    invoiceItemCode!: keyof typeof LegacyInvoiceItemCode;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => Date, {nullable:true})
    startDate!: Date | null;

    @Field(() => Date, {nullable:true})
    endDate!: Date | null;

    @Field(() => Int, {nullable:false})
    amount!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:false,defaultValue:21})
    taxPercent!: number;

    @Field(() => LegacyInvoice, {nullable:false})
    legacyInvoice?: LegacyInvoice;
}
