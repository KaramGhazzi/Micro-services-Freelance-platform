import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput } from './legacy-invoice-update-without-legacy-invoice-items.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput } from './legacy-invoice-create-without-legacy-invoice-items.input';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';

@InputType()
export class LegacyInvoiceUpsertWithoutLegacyInvoiceItemsInput {

    @Field(() => LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput, {nullable:false})
    @Type(() => LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput)
    update!: LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput;

    @Field(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput, {nullable:false})
    @Type(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput)
    create!: LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput;

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereInput)
    where?: LegacyInvoiceWhereInput;
}
