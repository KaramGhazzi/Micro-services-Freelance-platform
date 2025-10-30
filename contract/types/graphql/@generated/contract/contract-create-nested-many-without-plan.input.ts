import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ContractCreateWithoutPlanInput } from './contract-create-without-plan.input';
import { Type } from 'class-transformer';
import { ContractCreateOrConnectWithoutPlanInput } from './contract-create-or-connect-without-plan.input';
import { ContractCreateManyPlanInputEnvelope } from './contract-create-many-plan-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';

@InputType()
export class ContractCreateNestedManyWithoutPlanInput {

    @Field(() => [ContractCreateWithoutPlanInput], {nullable:true})
    @Type(() => ContractCreateWithoutPlanInput)
    create?: Array<ContractCreateWithoutPlanInput>;

    @Field(() => [ContractCreateOrConnectWithoutPlanInput], {nullable:true})
    @Type(() => ContractCreateOrConnectWithoutPlanInput)
    connectOrCreate?: Array<ContractCreateOrConnectWithoutPlanInput>;

    @Field(() => ContractCreateManyPlanInputEnvelope, {nullable:true})
    @Type(() => ContractCreateManyPlanInputEnvelope)
    createMany?: ContractCreateManyPlanInputEnvelope;

    @Field(() => [ContractWhereUniqueInput], {nullable:true})
    @Type(() => ContractWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ContractWhereUniqueInput, 'id'>>;
}
