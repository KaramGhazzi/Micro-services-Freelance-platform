import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CheckoutCountOrderByAggregateInput } from './checkout-count-order-by-aggregate.input';
import { CheckoutAvgOrderByAggregateInput } from './checkout-avg-order-by-aggregate.input';
import { CheckoutMaxOrderByAggregateInput } from './checkout-max-order-by-aggregate.input';
import { CheckoutMinOrderByAggregateInput } from './checkout-min-order-by-aggregate.input';
import { CheckoutSumOrderByAggregateInput } from './checkout-sum-order-by-aggregate.input';

@InputType()
export class CheckoutOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    planId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    token?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sessionId?: keyof typeof SortOrder;

    @Field(() => CheckoutCountOrderByAggregateInput, {nullable:true})
    _count?: CheckoutCountOrderByAggregateInput;

    @Field(() => CheckoutAvgOrderByAggregateInput, {nullable:true})
    _avg?: CheckoutAvgOrderByAggregateInput;

    @Field(() => CheckoutMaxOrderByAggregateInput, {nullable:true})
    _max?: CheckoutMaxOrderByAggregateInput;

    @Field(() => CheckoutMinOrderByAggregateInput, {nullable:true})
    _min?: CheckoutMinOrderByAggregateInput;

    @Field(() => CheckoutSumOrderByAggregateInput, {nullable:true})
    _sum?: CheckoutSumOrderByAggregateInput;
}
