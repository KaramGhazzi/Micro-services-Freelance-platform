import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { Type } from 'class-transformer';
import { ContractCreateWithoutPlanInput } from './contract-create-without-plan.input';

@InputType()
export class ContractCreateOrConnectWithoutPlanInput {

    @Field(() => ContractWhereUniqueInput, {nullable:false})
    @Type(() => ContractWhereUniqueInput)
    where!: Prisma.AtLeast<ContractWhereUniqueInput, 'id'>;

    @Field(() => ContractCreateWithoutPlanInput, {nullable:false})
    @Type(() => ContractCreateWithoutPlanInput)
    create!: ContractCreateWithoutPlanInput;
}
