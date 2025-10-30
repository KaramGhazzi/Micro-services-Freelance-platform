import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ContractCreateWithoutPlanInput } from './contract-create-without-plan.input';
import { Type } from 'class-transformer';
import { ContractCreateOrConnectWithoutPlanInput } from './contract-create-or-connect-without-plan.input';
import { ContractUpsertWithWhereUniqueWithoutPlanInput } from './contract-upsert-with-where-unique-without-plan.input';
import { ContractCreateManyPlanInputEnvelope } from './contract-create-many-plan-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { ContractUpdateWithWhereUniqueWithoutPlanInput } from './contract-update-with-where-unique-without-plan.input';
import { ContractUpdateManyWithWhereWithoutPlanInput } from './contract-update-many-with-where-without-plan.input';
import { ContractScalarWhereInput } from './contract-scalar-where.input';

@InputType()
export class ContractUpdateManyWithoutPlanNestedInput {

    @Field(() => [ContractCreateWithoutPlanInput], {nullable:true})
    @Type(() => ContractCreateWithoutPlanInput)
    create?: Array<ContractCreateWithoutPlanInput>;

    @Field(() => [ContractCreateOrConnectWithoutPlanInput], {nullable:true})
    @Type(() => ContractCreateOrConnectWithoutPlanInput)
    connectOrCreate?: Array<ContractCreateOrConnectWithoutPlanInput>;

    @Field(() => [ContractUpsertWithWhereUniqueWithoutPlanInput], {nullable:true})
    @Type(() => ContractUpsertWithWhereUniqueWithoutPlanInput)
    upsert?: Array<ContractUpsertWithWhereUniqueWithoutPlanInput>;

    @Field(() => ContractCreateManyPlanInputEnvelope, {nullable:true})
    @Type(() => ContractCreateManyPlanInputEnvelope)
    createMany?: ContractCreateManyPlanInputEnvelope;

    @Field(() => [ContractWhereUniqueInput], {nullable:true})
    @Type(() => ContractWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ContractWhereUniqueInput, 'id'>>;

    @Field(() => [ContractWhereUniqueInput], {nullable:true})
    @Type(() => ContractWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ContractWhereUniqueInput, 'id'>>;

    @Field(() => [ContractWhereUniqueInput], {nullable:true})
    @Type(() => ContractWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ContractWhereUniqueInput, 'id'>>;

    @Field(() => [ContractWhereUniqueInput], {nullable:true})
    @Type(() => ContractWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ContractWhereUniqueInput, 'id'>>;

    @Field(() => [ContractUpdateWithWhereUniqueWithoutPlanInput], {nullable:true})
    @Type(() => ContractUpdateWithWhereUniqueWithoutPlanInput)
    update?: Array<ContractUpdateWithWhereUniqueWithoutPlanInput>;

    @Field(() => [ContractUpdateManyWithWhereWithoutPlanInput], {nullable:true})
    @Type(() => ContractUpdateManyWithWhereWithoutPlanInput)
    updateMany?: Array<ContractUpdateManyWithWhereWithoutPlanInput>;

    @Field(() => [ContractScalarWhereInput], {nullable:true})
    @Type(() => ContractScalarWhereInput)
    deleteMany?: Array<ContractScalarWhereInput>;
}
