import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PlanCreateInput } from './plan-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnePlanArgs {

    @Field(() => PlanCreateInput, {nullable:false})
    @Type(() => PlanCreateInput)
    data!: PlanCreateInput;
}
