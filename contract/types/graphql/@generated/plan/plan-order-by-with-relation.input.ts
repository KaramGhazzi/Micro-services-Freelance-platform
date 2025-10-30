import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ProductOrderByWithRelationInput } from '../product/product-order-by-with-relation.input';
import { ContractOrderByRelationAggregateInput } from '../contract/contract-order-by-relation-aggregate.input';
import { CheckoutOrderByRelationAggregateInput } from '../checkout/checkout-order-by-relation-aggregate.input';

@InputType()
export class PlanOrderByWithRelationInput {

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

    @Field(() => ProductOrderByWithRelationInput, {nullable:true})
    product?: ProductOrderByWithRelationInput;

    @Field(() => ContractOrderByRelationAggregateInput, {nullable:true})
    contracts?: ContractOrderByRelationAggregateInput;

    @Field(() => CheckoutOrderByRelationAggregateInput, {nullable:true})
    checkouts?: CheckoutOrderByRelationAggregateInput;
}
