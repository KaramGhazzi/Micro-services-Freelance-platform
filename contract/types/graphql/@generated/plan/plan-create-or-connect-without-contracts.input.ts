import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { Type } from 'class-transformer';
import { PlanCreateWithoutContractsInput } from './plan-create-without-contracts.input';

@InputType()
export class PlanCreateOrConnectWithoutContractsInput {

    @Field(() => PlanWhereUniqueInput, {nullable:false})
    @Type(() => PlanWhereUniqueInput)
    where!: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;

    @Field(() => PlanCreateWithoutContractsInput, {nullable:false})
    @Type(() => PlanCreateWithoutContractsInput)
    create!: PlanCreateWithoutContractsInput;
}
