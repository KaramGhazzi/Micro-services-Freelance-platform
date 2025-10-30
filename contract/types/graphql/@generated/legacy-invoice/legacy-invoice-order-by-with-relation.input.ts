import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { LegacyInvoiceItemOrderByRelationAggregateInput } from '../legacy-invoice-item/legacy-invoice-item-order-by-relation-aggregate.input';

@InputType()
export class LegacyInvoiceOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    firstName?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    lastName?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    addressLine1?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    addressLine2?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    postalCode?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    city?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => LegacyInvoiceItemOrderByRelationAggregateInput, {nullable:true})
    legacyInvoiceItems?: LegacyInvoiceItemOrderByRelationAggregateInput;
}
