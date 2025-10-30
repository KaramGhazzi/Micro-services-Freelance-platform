import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ContractAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    companyId?: number;

    @Field(() => Float, {nullable:true})
    planId?: number;

    @Field(() => Float, {nullable:true})
    usageAmount?: number;

    @Field(() => Float, {nullable:true})
    usageIntervalCount?: number;
}
