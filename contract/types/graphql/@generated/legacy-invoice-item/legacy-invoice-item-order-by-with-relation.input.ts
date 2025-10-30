import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { LegacyInvoiceOrderByWithRelationInput } from '../legacy-invoice/legacy-invoice-order-by-with-relation.input';

@InputType()
export class LegacyInvoiceItemOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    legacyInvoiceId?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    contractId?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    invoiceItemCode?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    startDate?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    endDate?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    amount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    taxPercent?: keyof typeof SortOrder;

    @Field(() => LegacyInvoiceOrderByWithRelationInput, {nullable:true})
    legacyInvoice?: LegacyInvoiceOrderByWithRelationInput;
}
