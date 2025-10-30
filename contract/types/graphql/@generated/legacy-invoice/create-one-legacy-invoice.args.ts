import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceCreateInput } from './legacy-invoice-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneLegacyInvoiceArgs {

    @Field(() => LegacyInvoiceCreateInput, {nullable:false})
    @Type(() => LegacyInvoiceCreateInput)
    data!: LegacyInvoiceCreateInput;
}
