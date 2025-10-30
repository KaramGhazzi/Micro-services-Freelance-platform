import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PlanCount {

    @Field(() => Int, {nullable:false})
    contracts?: number;

    @Field(() => Int, {nullable:false})
    checkouts?: number;
}
