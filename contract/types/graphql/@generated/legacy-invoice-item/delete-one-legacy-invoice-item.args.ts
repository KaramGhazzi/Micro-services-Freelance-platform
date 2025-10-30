import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneLegacyInvoiceItemArgs {

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:false})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    where!: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;
}
