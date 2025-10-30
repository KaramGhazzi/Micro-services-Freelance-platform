import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceItemScalarWhereInput } from './legacy-invoice-item-scalar-where.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemUpdateManyMutationInput } from './legacy-invoice-item-update-many-mutation.input';

@InputType()
export class LegacyInvoiceItemUpdateManyWithWhereWithoutLegacyInvoiceInput {

    @Field(() => LegacyInvoiceItemScalarWhereInput, {nullable:false})
    @Type(() => LegacyInvoiceItemScalarWhereInput)
    where!: LegacyInvoiceItemScalarWhereInput;

    @Field(() => LegacyInvoiceItemUpdateManyMutationInput, {nullable:false})
    @Type(() => LegacyInvoiceItemUpdateManyMutationInput)
    data!: LegacyInvoiceItemUpdateManyMutationInput;
}
