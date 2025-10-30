import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { Type } from 'class-transformer';
import { ContractUpdateWithoutPlanInput } from './contract-update-without-plan.input';
import { ContractCreateWithoutPlanInput } from './contract-create-without-plan.input';

@InputType()
export class ContractUpsertWithWhereUniqueWithoutPlanInput {

    @Field(() => ContractWhereUniqueInput, {nullable:false})
    @Type(() => ContractWhereUniqueInput)
    where!: Prisma.AtLeast<ContractWhereUniqueInput, 'id'>;

    @Field(() => ContractUpdateWithoutPlanInput, {nullable:false})
    @Type(() => ContractUpdateWithoutPlanInput)
    update!: ContractUpdateWithoutPlanInput;

    @Field(() => ContractCreateWithoutPlanInput, {nullable:false})
    @Type(() => ContractCreateWithoutPlanInput)
    create!: ContractCreateWithoutPlanInput;
}
