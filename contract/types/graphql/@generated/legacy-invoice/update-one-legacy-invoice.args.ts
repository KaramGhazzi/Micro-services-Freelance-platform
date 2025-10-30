import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceUpdateInput } from './legacy-invoice-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';

@ArgsType()
export class UpdateOneLegacyInvoiceArgs {

    @Field(() => LegacyInvoiceUpdateInput, {nullable:false})
    @Type(() => LegacyInvoiceUpdateInput)
    data!: LegacyInvoiceUpdateInput;

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;
}
