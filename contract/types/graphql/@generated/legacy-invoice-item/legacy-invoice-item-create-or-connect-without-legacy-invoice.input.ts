import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemCreateWithoutLegacyInvoiceInput } from './legacy-invoice-item-create-without-legacy-invoice.input';

@InputType()
export class LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput {

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;

    @Field(() => LegacyInvoiceItemCreateWithoutLegacyInvoiceInput, {nullable:false})
    @Type(() => LegacyInvoiceItemCreateWithoutLegacyInvoiceInput)
    create!: LegacyInvoiceItemCreateWithoutLegacyInvoiceInput;
}
