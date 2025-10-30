import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { Type } from 'class-transformer';
import { PlanCreateWithoutProductInput } from './plan-create-without-product.input';

@InputType()
export class PlanCreateOrConnectWithoutProductInput {

    @Field(() => PlanWhereUniqueInput, {nullable:false})
    @Type(() => PlanWhereUniqueInput)
    where!: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;

    @Field(() => PlanCreateWithoutProductInput, {nullable:false})
    @Type(() => PlanCreateWithoutProductInput)
    create!: PlanCreateWithoutProductInput;
}
