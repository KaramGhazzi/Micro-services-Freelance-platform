import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceItemWhereInput } from './legacy-invoice-item-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyLegacyInvoiceItemArgs {

    @Field(() => LegacyInvoiceItemWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceItemWhereInput)
    where?: LegacyInvoiceItemWhereInput;
}
