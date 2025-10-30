import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ContractAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    companyId?: true;

    @Field(() => Boolean, {nullable:true})
    planId?: true;

    @Field(() => Boolean, {nullable:true})
    usageAmount?: true;

    @Field(() => Boolean, {nullable:true})
    usageIntervalCount?: true;
}
