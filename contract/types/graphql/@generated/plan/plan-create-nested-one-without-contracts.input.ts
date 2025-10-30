import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanCreateWithoutContractsInput } from './plan-create-without-contracts.input';
import { Type } from 'class-transformer';
import { PlanCreateOrConnectWithoutContractsInput } from './plan-create-or-connect-without-contracts.input';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';

@InputType()
export class PlanCreateNestedOneWithoutContractsInput {

    @Field(() => PlanCreateWithoutContractsInput, {nullable:true})
    @Type(() => PlanCreateWithoutContractsInput)
    create?: PlanCreateWithoutContractsInput;

    @Field(() => PlanCreateOrConnectWithoutContractsInput, {nullable:true})
    @Type(() => PlanCreateOrConnectWithoutContractsInput)
    connectOrCreate?: PlanCreateOrConnectWithoutContractsInput;

    @Field(() => PlanWhereUniqueInput, {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    connect?: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;
}
