import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ContractMinOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    externalProviderId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    invoiceId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    planId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    startDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    endDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageType?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageAmount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageInterval?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageIntervalCount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    subscriptionExpireDate?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    renewalInterval?: keyof typeof SortOrder;
}
