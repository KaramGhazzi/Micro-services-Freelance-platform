import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ContractSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => Int, {nullable:true})
    planId?: number;

    @Field(() => Int, {nullable:true})
    usageAmount?: number;

    @Field(() => Int, {nullable:true})
    usageIntervalCount?: number;
}
