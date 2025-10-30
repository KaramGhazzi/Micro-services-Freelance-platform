import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueLegacyInvoiceArgs {

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;
}
