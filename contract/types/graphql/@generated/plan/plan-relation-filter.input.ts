import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanWhereInput } from './plan-where.input';

@InputType()
export class PlanRelationFilter {

    @Field(() => PlanWhereInput, {nullable:true})
    is?: PlanWhereInput;

    @Field(() => PlanWhereInput, {nullable:true})
    isNot?: PlanWhereInput;
}
