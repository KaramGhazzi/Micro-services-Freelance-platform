import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { LegacyInvoiceCountOrderByAggregateInput } from './legacy-invoice-count-order-by-aggregate.input';
import { LegacyInvoiceAvgOrderByAggregateInput } from './legacy-invoice-avg-order-by-aggregate.input';
import { LegacyInvoiceMaxOrderByAggregateInput } from './legacy-invoice-max-order-by-aggregate.input';
import { LegacyInvoiceMinOrderByAggregateInput } from './legacy-invoice-min-order-by-aggregate.input';
import { LegacyInvoiceSumOrderByAggregateInput } from './legacy-invoice-sum-order-by-aggregate.input';

@InputType()
export class LegacyInvoiceOrderByWithAggregationInput {

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

    @Field(() => LegacyInvoiceCountOrderByAggregateInput, {nullable:true})
    _count?: LegacyInvoiceCountOrderByAggregateInput;

    @Field(() => LegacyInvoiceAvgOrderByAggregateInput, {nullable:true})
    _avg?: LegacyInvoiceAvgOrderByAggregateInput;

    @Field(() => LegacyInvoiceMaxOrderByAggregateInput, {nullable:true})
    _max?: LegacyInvoiceMaxOrderByAggregateInput;

    @Field(() => LegacyInvoiceMinOrderByAggregateInput, {nullable:true})
    _min?: LegacyInvoiceMinOrderByAggregateInput;

    @Field(() => LegacyInvoiceSumOrderByAggregateInput, {nullable:true})
    _sum?: LegacyInvoiceSumOrderByAggregateInput;
}
