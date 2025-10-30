import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PlanCountOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    externalProviderId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    externalProviderSync?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    externalProviderPaymentMethodId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    slug?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    productId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageType?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageAmount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageInterval?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageIntervalCount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    renewalInterval?: keyof typeof SortOrder;
}
