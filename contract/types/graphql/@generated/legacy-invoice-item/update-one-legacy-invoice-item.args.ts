import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceItemUpdateInput } from './legacy-invoice-item-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';

@ArgsType()
export class UpdateOneLegacyInvoiceItemArgs {

    @Field(() => LegacyInvoiceItemUpdateInput, {nullable:false})
    @Type(() => LegacyInvoiceItemUpdateInput)
    data!: LegacyInvoiceItemUpdateInput;

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;
}
