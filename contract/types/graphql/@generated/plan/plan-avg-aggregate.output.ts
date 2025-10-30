import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class PlanAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    productId?: number;

    @Field(() => Float, {nullable:true})
    usageAmount?: number;

    @Field(() => Float, {nullable:true})
    usageIntervalCount?: number;
}
