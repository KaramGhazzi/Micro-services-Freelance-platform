import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceUpdateManyMutationInput } from './legacy-invoice-update-many-mutation.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';

@ArgsType()
export class UpdateManyLegacyInvoiceArgs {

    @Field(() => LegacyInvoiceUpdateManyMutationInput, {nullable:false})
    @Type(() => LegacyInvoiceUpdateManyMutationInput)
    data!: LegacyInvoiceUpdateManyMutationInput;

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereInput)
    where?: LegacyInvoiceWhereInput;
}
