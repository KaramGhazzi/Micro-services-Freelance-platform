import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemCreateInput } from './legacy-invoice-item-create.input';
import { LegacyInvoiceItemUpdateInput } from './legacy-invoice-item-update.input';

@ArgsType()
export class UpsertOneLegacyInvoiceItemArgs {

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;

    @Field(() => LegacyInvoiceItemCreateInput, {nullable:false})
    @Type(() => LegacyInvoiceItemCreateInput)
    create!: LegacyInvoiceItemCreateInput;

    @Field(() => LegacyInvoiceItemUpdateInput, {nullable:false})
    @Type(() => LegacyInvoiceItemUpdateInput)
    update!: LegacyInvoiceItemUpdateInput;
}
