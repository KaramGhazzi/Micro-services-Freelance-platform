import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PlanUpdateInput } from './plan-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';

@ArgsType()
export class UpdateOnePlanArgs {

    @Field(() => PlanUpdateInput, {nullable:false})
    @Type(() => PlanUpdateInput)
    data!: PlanUpdateInput;

    @Field(() => PlanWhereUniqueInput, {nullable:false})
    @Type(() => PlanWhereUniqueInput)
    where!: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;
}
