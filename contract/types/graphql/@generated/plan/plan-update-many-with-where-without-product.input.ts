import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanScalarWhereInput } from './plan-scalar-where.input';
import { Type } from 'class-transformer';
import { PlanUpdateManyMutationInput } from './plan-update-many-mutation.input';

@InputType()
export class PlanUpdateManyWithWhereWithoutProductInput {

    @Field(() => PlanScalarWhereInput, {nullable:false})
    @Type(() => PlanScalarWhereInput)
    where!: PlanScalarWhereInput;

    @Field(() => PlanUpdateManyMutationInput, {nullable:false})
    @Type(() => PlanUpdateManyMutationInput)
    data!: PlanUpdateManyMutationInput;
}
