import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompanyCreateNestedOneWithoutCheckoutInput } from '../external-provider-company/external-provider-company-create-nested-one-without-checkout.input';
import { PlanCreateNestedOneWithoutCheckoutsInput } from '../plan/plan-create-nested-one-without-checkouts.input';

@InputType()
export class CheckoutCreateInput {

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => String, {nullable:false})
    token!: string;

    @Field(() => String, {nullable:false})
    sessionId!: string;

    @Field(() => ExternalProviderCompanyCreateNestedOneWithoutCheckoutInput, {nullable:false})
    company!: ExternalProviderCompanyCreateNestedOneWithoutCheckoutInput;

    @Field(() => PlanCreateNestedOneWithoutCheckoutsInput, {nullable:false})
    plan!: PlanCreateNestedOneWithoutCheckoutsInput;
}
