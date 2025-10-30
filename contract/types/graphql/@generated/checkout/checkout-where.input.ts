import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ExternalProviderCompanyRelationFilter } from '../external-provider-company/external-provider-company-relation-filter.input';
import { PlanRelationFilter } from '../plan/plan-relation-filter.input';

@InputType()
export class CheckoutWhereInput {

    @Field(() => [CheckoutWhereInput], {nullable:true})
    AND?: Array<CheckoutWhereInput>;

    @Field(() => [CheckoutWhereInput], {nullable:true})
    OR?: Array<CheckoutWhereInput>;

    @Field(() => [CheckoutWhereInput], {nullable:true})
    NOT?: Array<CheckoutWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    planId?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    companyId?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    token?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    sessionId?: StringFilter;

    @Field(() => ExternalProviderCompanyRelationFilter, {nullable:true})
    company?: ExternalProviderCompanyRelationFilter;

    @Field(() => PlanRelationFilter, {nullable:true})
    plan?: PlanRelationFilter;
}
