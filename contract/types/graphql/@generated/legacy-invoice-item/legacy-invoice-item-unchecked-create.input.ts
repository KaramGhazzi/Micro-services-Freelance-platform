import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from '../prisma/legacy-invoice-item-code.enum';

@InputType()
export class LegacyInvoiceItemUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:false})
    legacyInvoiceId!: number;

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
}
