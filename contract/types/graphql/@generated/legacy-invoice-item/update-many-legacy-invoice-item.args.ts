import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceItemUpdateManyMutationInput } from './legacy-invoice-item-update-many-mutation.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemWhereInput } from './legacy-invoice-item-where.input';

@ArgsType()
export class UpdateManyLegacyInvoiceItemArgs {

    @Field(() => LegacyInvoiceItemUpdateManyMutationInput, {nullable:false})
    @Type(() => LegacyInvoiceItemUpdateManyMutationInput)
    data!: LegacyInvoiceItemUpdateManyMutationInput;

    @Field(() => LegacyInvoiceItemWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceItemWhereInput)
    where?: LegacyInvoiceItemWhereInput;
}
