import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceItemCreateInput } from './legacy-invoice-item-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneLegacyInvoiceItemArgs {

    @Field(() => LegacyInvoiceItemCreateInput, {nullable:false})
    @Type(() => LegacyInvoiceItemCreateInput)
    data!: LegacyInvoiceItemCreateInput;
}
