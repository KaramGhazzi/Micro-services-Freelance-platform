import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput } from './legacy-invoice-item-update-without-legacy-invoice.input';
import { LegacyInvoiceItemCreateWithoutLegacyInvoiceInput } from './legacy-invoice-item-create-without-legacy-invoice.input';

@InputType()
export class LegacyInvoiceItemUpsertWithWhereUniqueWithoutLegacyInvoiceInput {

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;

    @Field(() => LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput, {nullable:false})
    @Type(() => LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput)
    update!: LegacyInvoiceItemUpdateWithoutLegacyInvoiceInput;

    @Field(() => LegacyInvoiceItemCreateWithoutLegacyInvoiceInput, {nullable:false})
    @Type(() => LegacyInvoiceItemCreateWithoutLegacyInvoiceInput)
    create!: LegacyInvoiceItemCreateWithoutLegacyInvoiceInput;
}
