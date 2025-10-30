import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanCreateWithoutCheckoutsInput } from './plan-create-without-checkouts.input';
import { Type } from 'class-transformer';
import { PlanCreateOrConnectWithoutCheckoutsInput } from './plan-create-or-connect-without-checkouts.input';
import { PlanUpsertWithoutCheckoutsInput } from './plan-upsert-without-checkouts.input';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { PlanUpdateToOneWithWhereWithoutCheckoutsInput } from './plan-update-to-one-with-where-without-checkouts.input';

@InputType()
export class PlanUpdateOneRequiredWithoutCheckoutsNestedInput {

    @Field(() => PlanCreateWithoutCheckoutsInput, {nullable:true})
    @Type(() => PlanCreateWithoutCheckoutsInput)
    create?: PlanCreateWithoutCheckoutsInput;

    @Field(() => PlanCreateOrConnectWithoutCheckoutsInput, {nullable:true})
    @Type(() => PlanCreateOrConnectWithoutCheckoutsInput)
    connectOrCreate?: PlanCreateOrConnectWithoutCheckoutsInput;

    @Field(() => PlanUpsertWithoutCheckoutsInput, {nullable:true})
    @Type(() => PlanUpsertWithoutCheckoutsInput)
    upsert?: PlanUpsertWithoutCheckoutsInput;

    @Field(() => PlanWhereUniqueInput, {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    connect?: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;

    @Field(() => PlanUpdateToOneWithWhereWithoutCheckoutsInput, {nullable:true})
    @Type(() => PlanUpdateToOneWithWhereWithoutCheckoutsInput)
    update?: PlanUpdateToOneWithWhereWithoutCheckoutsInput;
}
