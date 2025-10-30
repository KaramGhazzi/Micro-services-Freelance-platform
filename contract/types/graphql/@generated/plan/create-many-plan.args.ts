import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PlanCreateManyInput } from './plan-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyPlanArgs {

    @Field(() => [PlanCreateManyInput], {nullable:false})
    @Type(() => PlanCreateManyInput)
    data!: Array<PlanCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
