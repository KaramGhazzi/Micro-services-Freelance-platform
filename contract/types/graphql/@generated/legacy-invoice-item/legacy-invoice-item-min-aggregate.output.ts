import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from '../prisma/legacy-invoice-item-code.enum';

@ObjectType()
export class LegacyInvoiceItemMinAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    legacyInvoiceId?: number;

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
}
