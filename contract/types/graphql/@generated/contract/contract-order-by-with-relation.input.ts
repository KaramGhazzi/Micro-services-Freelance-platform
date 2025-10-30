import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { PlanOrderByWithRelationInput } from '../plan/plan-order-by-with-relation.input';

@InputType()
export class ContractOrderByWithRelationInput {

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

    @Field(() => PlanOrderByWithRelationInput, {nullable:true})
    plan?: PlanOrderByWithRelationInput;
}
