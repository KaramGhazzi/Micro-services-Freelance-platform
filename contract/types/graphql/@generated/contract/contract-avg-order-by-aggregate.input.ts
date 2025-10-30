import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ContractAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    planId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageAmount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    usageIntervalCount?: keyof typeof SortOrder;
}
