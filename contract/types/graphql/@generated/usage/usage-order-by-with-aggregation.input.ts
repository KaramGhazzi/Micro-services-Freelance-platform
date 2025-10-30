import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UsageCountOrderByAggregateInput } from './usage-count-order-by-aggregate.input';
import { UsageAvgOrderByAggregateInput } from './usage-avg-order-by-aggregate.input';
import { UsageMaxOrderByAggregateInput } from './usage-max-order-by-aggregate.input';
import { UsageMinOrderByAggregateInput } from './usage-min-order-by-aggregate.input';
import { UsageSumOrderByAggregateInput } from './usage-sum-order-by-aggregate.input';

@InputType()
export class UsageOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    amount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    objectId?: SortOrderInput;

    @Field(() => UsageCountOrderByAggregateInput, {nullable:true})
    _count?: UsageCountOrderByAggregateInput;

    @Field(() => UsageAvgOrderByAggregateInput, {nullable:true})
    _avg?: UsageAvgOrderByAggregateInput;

    @Field(() => UsageMaxOrderByAggregateInput, {nullable:true})
    _max?: UsageMaxOrderByAggregateInput;

    @Field(() => UsageMinOrderByAggregateInput, {nullable:true})
    _min?: UsageMinOrderByAggregateInput;

    @Field(() => UsageSumOrderByAggregateInput, {nullable:true})
    _sum?: UsageSumOrderByAggregateInput;
}
