import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanUpdateWithoutCheckoutsInput } from './plan-update-without-checkouts.input';
import { Type } from 'class-transformer';
import { PlanCreateWithoutCheckoutsInput } from './plan-create-without-checkouts.input';
import { PlanWhereInput } from './plan-where.input';

@InputType()
export class PlanUpsertWithoutCheckoutsInput {

    @Field(() => PlanUpdateWithoutCheckoutsInput, {nullable:false})
    @Type(() => PlanUpdateWithoutCheckoutsInput)
    update!: PlanUpdateWithoutCheckoutsInput;

    @Field(() => PlanCreateWithoutCheckoutsInput, {nullable:false})
    @Type(() => PlanCreateWithoutCheckoutsInput)
    create!: PlanCreateWithoutCheckoutsInput;

    @Field(() => PlanWhereInput, {nullable:true})
    @Type(() => PlanWhereInput)
    where?: PlanWhereInput;
}
