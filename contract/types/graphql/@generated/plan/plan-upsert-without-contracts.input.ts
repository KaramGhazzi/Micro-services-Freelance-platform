import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanUpdateWithoutContractsInput } from './plan-update-without-contracts.input';
import { Type } from 'class-transformer';
import { PlanCreateWithoutContractsInput } from './plan-create-without-contracts.input';
import { PlanWhereInput } from './plan-where.input';

@InputType()
export class PlanUpsertWithoutContractsInput {

    @Field(() => PlanUpdateWithoutContractsInput, {nullable:false})
    @Type(() => PlanUpdateWithoutContractsInput)
    update!: PlanUpdateWithoutContractsInput;

    @Field(() => PlanCreateWithoutContractsInput, {nullable:false})
    @Type(() => PlanCreateWithoutContractsInput)
    create!: PlanCreateWithoutContractsInput;

    @Field(() => PlanWhereInput, {nullable:true})
    @Type(() => PlanWhereInput)
    where?: PlanWhereInput;
}
