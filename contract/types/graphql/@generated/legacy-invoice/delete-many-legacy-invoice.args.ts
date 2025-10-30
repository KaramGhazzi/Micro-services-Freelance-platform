import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyLegacyInvoiceArgs {

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereInput)
    where?: LegacyInvoiceWhereInput;
}
