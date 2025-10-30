import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { Type } from 'class-transformer';
import { PlanCreateWithoutCheckoutsInput } from './plan-create-without-checkouts.input';

@InputType()
export class PlanCreateOrConnectWithoutCheckoutsInput {

    @Field(() => PlanWhereUniqueInput, {nullable:false})
    @Type(() => PlanWhereUniqueInput)
    where!: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;

    @Field(() => PlanCreateWithoutCheckoutsInput, {nullable:false})
    @Type(() => PlanCreateWithoutCheckoutsInput)
    create!: PlanCreateWithoutCheckoutsInput;
}
