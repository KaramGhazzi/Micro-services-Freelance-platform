import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput } from './legacy-invoice-update-without-legacy-invoice-items.input';

@InputType()
export class LegacyInvoiceUpdateToOneWithWhereWithoutLegacyInvoiceItemsInput {

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereInput)
    where?: LegacyInvoiceWhereInput;

    @Field(() => LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput, {nullable:false})
    @Type(() => LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput)
    data!: LegacyInvoiceUpdateWithoutLegacyInvoiceItemsInput;
}
