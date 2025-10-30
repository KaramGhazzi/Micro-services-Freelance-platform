import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ExternalProviderCompanyOrderByWithRelationInput } from '../external-provider-company/external-provider-company-order-by-with-relation.input';
import { PlanOrderByWithRelationInput } from '../plan/plan-order-by-with-relation.input';

@InputType()
export class CheckoutOrderByWithRelationInput {

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

    @Field(() => ExternalProviderCompanyOrderByWithRelationInput, {nullable:true})
    company?: ExternalProviderCompanyOrderByWithRelationInput;

    @Field(() => PlanOrderByWithRelationInput, {nullable:true})
    plan?: PlanOrderByWithRelationInput;
}
