import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { Type } from 'class-transformer';
import { PlanCreateInput } from './plan-create.input';
import { PlanUpdateInput } from './plan-update.input';

@ArgsType()
export class UpsertOnePlanArgs {

    @Field(() => PlanWhereUniqueInput, {nullable:false})
    @Type(() => PlanWhereUniqueInput)
    where!: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;

    @Field(() => PlanCreateInput, {nullable:false})
    @Type(() => PlanCreateInput)
    create!: PlanCreateInput;

    @Field(() => PlanUpdateInput, {nullable:false})
    @Type(() => PlanUpdateInput)
    update!: PlanUpdateInput;
}
