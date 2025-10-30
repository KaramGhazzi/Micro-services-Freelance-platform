import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ContractMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    companyId?: true;

    @Field(() => Boolean, {nullable:true})
    externalProviderId?: true;

    @Field(() => Boolean, {nullable:true})
    invoiceId?: true;

    @Field(() => Boolean, {nullable:true})
    planId?: true;

    @Field(() => Boolean, {nullable:true})
    startDate?: true;

    @Field(() => Boolean, {nullable:true})
    endDate?: true;

    @Field(() => Boolean, {nullable:true})
    usageType?: true;

    @Field(() => Boolean, {nullable:true})
    usageAmount?: true;

    @Field(() => Boolean, {nullable:true})
    usageInterval?: true;

    @Field(() => Boolean, {nullable:true})
    usageIntervalCount?: true;

    @Field(() => Boolean, {nullable:true})
    subscriptionExpireDate?: true;

    @Field(() => Boolean, {nullable:true})
    renewalInterval?: true;
}
