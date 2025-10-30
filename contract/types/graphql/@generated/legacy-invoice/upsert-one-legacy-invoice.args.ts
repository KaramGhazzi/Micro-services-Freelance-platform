import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceCreateInput } from './legacy-invoice-create.input';
import { LegacyInvoiceUpdateInput } from './legacy-invoice-update.input';

@ArgsType()
export class UpsertOneLegacyInvoiceArgs {

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;

    @Field(() => LegacyInvoiceCreateInput, {nullable:false})
    @Type(() => LegacyInvoiceCreateInput)
    create!: LegacyInvoiceCreateInput;

    @Field(() => LegacyInvoiceUpdateInput, {nullable:false})
    @Type(() => LegacyInvoiceUpdateInput)
    update!: LegacyInvoiceUpdateInput;
}
