import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanCreateWithoutCheckoutsInput } from './plan-create-without-checkouts.input';
import { Type } from 'class-transformer';
import { PlanCreateOrConnectWithoutCheckoutsInput } from './plan-create-or-connect-without-checkouts.input';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';

@InputType()
export class PlanCreateNestedOneWithoutCheckoutsInput {

    @Field(() => PlanCreateWithoutCheckoutsInput, {nullable:true})
    @Type(() => PlanCreateWithoutCheckoutsInput)
    create?: PlanCreateWithoutCheckoutsInput;

    @Field(() => PlanCreateOrConnectWithoutCheckoutsInput, {nullable:true})
    @Type(() => PlanCreateOrConnectWithoutCheckoutsInput)
    connectOrCreate?: PlanCreateOrConnectWithoutCheckoutsInput;

    @Field(() => PlanWhereUniqueInput, {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    connect?: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;
}
