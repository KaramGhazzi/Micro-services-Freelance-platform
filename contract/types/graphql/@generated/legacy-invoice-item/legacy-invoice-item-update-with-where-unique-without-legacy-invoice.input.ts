import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput } from './legacy-invoice-item-update-without-legacy-invoice.input';

@InputType()
export class LegacyInvoiceItemUpdateWithWhereUniqueWithoutLegacyInvoiceInput {

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;

    @Field(() => LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput, {nullable:false})
    @Type(() => LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput)
    data!: LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput;
}
