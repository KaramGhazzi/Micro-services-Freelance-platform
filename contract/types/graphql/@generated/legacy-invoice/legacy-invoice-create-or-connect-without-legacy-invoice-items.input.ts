import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput } from './legacy-invoice-create-without-legacy-invoice-items.input';

@InputType()
export class LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput {

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;

    @Field(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput, {nullable:false})
    @Type(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput)
    create!: LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput;
}
