import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CheckoutWhereInput } from './checkout-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { ExternalProviderCompanyRelationFilter } from '../external-provider-company/external-provider-company-relation-filter.input';
import { PlanRelationFilter } from '../plan/plan-relation-filter.input';

@InputType()
export class CheckoutWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    token?: string;

    @Field(() => String, {nullable:true})
    sessionId?: string;

    @Field(() => [CheckoutWhereInput], {nullable:true})
    AND?: Array<CheckoutWhereInput>;

    @Field(() => [CheckoutWhereInput], {nullable:true})
    OR?: Array<CheckoutWhereInput>;

    @Field(() => [CheckoutWhereInput], {nullable:true})
    NOT?: Array<CheckoutWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    planId?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    companyId?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;

    @Field(() => ExternalProviderCompanyRelationFilter, {nullable:true})
    company?: ExternalProviderCompanyRelationFilter;

    @Field(() => PlanRelationFilter, {nullable:true})
    plan?: PlanRelationFilter;
}
