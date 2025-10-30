import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanWhereInput } from './plan-where.input';

@InputType()
export class PlanListRelationFilter {

    @Field(() => PlanWhereInput, {nullable:true})
    every?: PlanWhereInput;

    @Field(() => PlanWhereInput, {nullable:true})
    some?: PlanWhereInput;

    @Field(() => PlanWhereInput, {nullable:true})
    none?: PlanWhereInput;
}
