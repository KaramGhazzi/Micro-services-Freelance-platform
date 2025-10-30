import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { Type } from 'class-transformer';
import { PlanUpdateWithoutProductInput } from './plan-update-without-product.input';

@InputType()
export class PlanUpdateWithWhereUniqueWithoutProductInput {

    @Field(() => PlanWhereUniqueInput, {nullable:false})
    @Type(() => PlanWhereUniqueInput)
    where!: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;

    @Field(() => PlanUpdateWithoutProductInput, {nullable:false})
    @Type(() => PlanUpdateWithoutProductInput)
    data!: PlanUpdateWithoutProductInput;
}
