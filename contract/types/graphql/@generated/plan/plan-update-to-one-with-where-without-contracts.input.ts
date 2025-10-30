import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanWhereInput } from './plan-where.input';
import { Type } from 'class-transformer';
import { PlanUpdateWithoutContractsInput } from './plan-update-without-contracts.input';

@InputType()
export class PlanUpdateToOneWithWhereWithoutContractsInput {

    @Field(() => PlanWhereInput, {nullable:true})
    @Type(() => PlanWhereInput)
    where?: PlanWhereInput;

    @Field(() => PlanUpdateWithoutContractsInput, {nullable:false})
    @Type(() => PlanUpdateWithoutContractsInput)
    data!: PlanUpdateWithoutContractsInput;
}
