import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanWhereInput } from './plan-where.input';
import { Type } from 'class-transformer';
import { PlanUpdateWithoutCheckoutsInput } from './plan-update-without-checkouts.input';

@InputType()
export class PlanUpdateToOneWithWhereWithoutCheckoutsInput {

    @Field(() => PlanWhereInput, {nullable:true})
    @Type(() => PlanWhereInput)
    where?: PlanWhereInput;

    @Field(() => PlanUpdateWithoutCheckoutsInput, {nullable:false})
    @Type(() => PlanUpdateWithoutCheckoutsInput)
    data!: PlanUpdateWithoutCheckoutsInput;
}
