import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { PlanCountOrderByAggregateInput } from './plan-count-order-by-aggregate.input';
import { PlanAvgOrderByAggregateInput } from './plan-avg-order-by-aggregate.input';
import { PlanMaxOrderByAggregateInput } from './plan-max-order-by-aggregate.input';
import { PlanMinOrderByAggregateInput } from './plan-min-order-by-aggregate.input';
import { PlanSumOrderByAggregateInput } from './plan-sum-order-by-aggregate.input';

@InputType()
export class PlanOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    externalProviderId?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    externalProviderSync?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    externalProviderPaymentMethodId?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    slug?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    productId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageType?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    usageAmount?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    usageInterval?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    usageIntervalCount?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    renewalInterval?: SortOrderInput;

    @Field(() => PlanCountOrderByAggregateInput, {nullable:true})
    _count?: PlanCountOrderByAggregateInput;

    @Field(() => PlanAvgOrderByAggregateInput, {nullable:true})
    _avg?: PlanAvgOrderByAggregateInput;

    @Field(() => PlanMaxOrderByAggregateInput, {nullable:true})
    _max?: PlanMaxOrderByAggregateInput;

    @Field(() => PlanMinOrderByAggregateInput, {nullable:true})
    _min?: PlanMinOrderByAggregateInput;

    @Field(() => PlanSumOrderByAggregateInput, {nullable:true})
    _sum?: PlanSumOrderByAggregateInput;
}
