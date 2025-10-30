import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PlanSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    productId?: number;

    @Field(() => Int, {nullable:true})
    usageAmount?: number;

    @Field(() => Int, {nullable:true})
    usageIntervalCount?: number;
}
