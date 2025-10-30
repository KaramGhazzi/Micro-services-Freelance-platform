import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PlanUpdateManyMutationInput } from './plan-update-many-mutation.input';
import { Type } from 'class-transformer';
import { PlanWhereInput } from './plan-where.input';

@ArgsType()
export class UpdateManyPlanArgs {

    @Field(() => PlanUpdateManyMutationInput, {nullable:false})
    @Type(() => PlanUpdateManyMutationInput)
    data!: PlanUpdateManyMutationInput;

    @Field(() => PlanWhereInput, {nullable:true})
    @Type(() => PlanWhereInput)
    where?: PlanWhereInput;
}
