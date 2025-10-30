import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ContractCountOrderByAggregateInput } from './contract-count-order-by-aggregate.input';
import { ContractAvgOrderByAggregateInput } from './contract-avg-order-by-aggregate.input';
import { ContractMaxOrderByAggregateInput } from './contract-max-order-by-aggregate.input';
import { ContractMinOrderByAggregateInput } from './contract-min-order-by-aggregate.input';
import { ContractSumOrderByAggregateInput } from './contract-sum-order-by-aggregate.input';

@InputType()
export class ContractOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    externalProviderId?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    invoiceId?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    planId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    startDate?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    endDate?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    usageType?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    usageAmount?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    usageInterval?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    usageIntervalCount?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    subscriptionExpireDate?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    renewalInterval?: SortOrderInput;

    @Field(() => ContractCountOrderByAggregateInput, {nullable:true})
    _count?: ContractCountOrderByAggregateInput;

    @Field(() => ContractAvgOrderByAggregateInput, {nullable:true})
    _avg?: ContractAvgOrderByAggregateInput;

    @Field(() => ContractMaxOrderByAggregateInput, {nullable:true})
    _max?: ContractMaxOrderByAggregateInput;

    @Field(() => ContractMinOrderByAggregateInput, {nullable:true})
    _min?: ContractMinOrderByAggregateInput;

    @Field(() => ContractSumOrderByAggregateInput, {nullable:true})
    _sum?: ContractSumOrderByAggregateInput;
}
