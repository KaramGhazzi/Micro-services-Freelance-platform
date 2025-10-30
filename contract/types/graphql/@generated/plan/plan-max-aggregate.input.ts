import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PlanMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    externalProviderId?: true;

    @Field(() => Boolean, {nullable:true})
    externalProviderSync?: true;

    @Field(() => Boolean, {nullable:true})
    externalProviderPaymentMethodId?: true;

    @Field(() => Boolean, {nullable:true})
    slug?: true;

    @Field(() => Boolean, {nullable:true})
    productId?: true;

    @Field(() => Boolean, {nullable:true})
    usageType?: true;

    @Field(() => Boolean, {nullable:true})
    usageAmount?: true;

    @Field(() => Boolean, {nullable:true})
    usageInterval?: true;

    @Field(() => Boolean, {nullable:true})
    usageIntervalCount?: true;

    @Field(() => Boolean, {nullable:true})
    renewalInterval?: true;
}
