import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceCreateManyInput } from './legacy-invoice-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyLegacyInvoiceArgs {

    @Field(() => [LegacyInvoiceCreateManyInput], {nullable:false})
    @Type(() => LegacyInvoiceCreateManyInput)
    data!: Array<LegacyInvoiceCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
