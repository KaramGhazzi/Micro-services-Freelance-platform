import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceItemCreateManyLegacyInvoiceInput } from './legacy-invoice-item-create-many-legacy-invoice.input';
import { Type } from 'class-transformer';

@InputType()
export class LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope {

    @Field(() => [LegacyInvoiceItemCreateManyLegacyInvoiceInput], {nullable:false})
    @Type(() => LegacyInvoiceItemCreateManyLegacyInvoiceInput)
    data!: Array<LegacyInvoiceItemCreateManyLegacyInvoiceInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
