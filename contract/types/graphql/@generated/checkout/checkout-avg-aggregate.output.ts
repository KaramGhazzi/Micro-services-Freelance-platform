import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class CheckoutAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    planId?: number;

    @Field(() => Float, {nullable:true})
    companyId?: number;

    @Field(() => Float, {nullable:true})
    userId?: number;
}
