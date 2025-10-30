import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompany } from '../external-provider-company/external-provider-company.model';
import { Plan } from '../plan/plan.model';

@ObjectType()
export class Checkout {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    planId!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => String, {nullable:false})
    token!: string;

    @Field(() => String, {nullable:false})
    sessionId!: string;

    @Field(() => ExternalProviderCompany, {nullable:false})
    company?: ExternalProviderCompany;

    @Field(() => Plan, {nullable:false})
    plan?: Plan;
}
