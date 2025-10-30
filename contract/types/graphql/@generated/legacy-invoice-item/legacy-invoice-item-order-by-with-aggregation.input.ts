import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { LegacyInvoiceItemCountOrderByAggregateInput } from './legacy-invoice-item-count-order-by-aggregate.input';
import { LegacyInvoiceItemAvgOrderByAggregateInput } from './legacy-invoice-item-avg-order-by-aggregate.input';
import { LegacyInvoiceItemMaxOrderByAggregateInput } from './legacy-invoice-item-max-order-by-aggregate.input';
import { LegacyInvoiceItemMinOrderByAggregateInput } from './legacy-invoice-item-min-order-by-aggregate.input';
import { LegacyInvoiceItemSumOrderByAggregateInput } from './legacy-invoice-item-sum-order-by-aggregate.input';

@InputType()
export class LegacyInvoiceItemOrderByWithAggregationInput {

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

    @Field(() => LegacyInvoiceItemCountOrderByAggregateInput, {nullable:true})
    _count?: LegacyInvoiceItemCountOrderByAggregateInput;

    @Field(() => LegacyInvoiceItemAvgOrderByAggregateInput, {nullable:true})
    _avg?: LegacyInvoiceItemAvgOrderByAggregateInput;

    @Field(() => LegacyInvoiceItemMaxOrderByAggregateInput, {nullable:true})
    _max?: LegacyInvoiceItemMaxOrderByAggregateInput;

    @Field(() => LegacyInvoiceItemMinOrderByAggregateInput, {nullable:true})
    _min?: LegacyInvoiceItemMinOrderByAggregateInput;

    @Field(() => LegacyInvoiceItemSumOrderByAggregateInput, {nullable:true})
    _sum?: LegacyInvoiceItemSumOrderByAggregateInput;
}
