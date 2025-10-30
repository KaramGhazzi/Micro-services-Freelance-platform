import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ContractWhereUniqueInput } from './contract-where-unique.input';
import { Type } from 'class-transformer';
import { ContractUpdateWithoutPlanInput } from './contract-update-without-plan.input';

@InputType()
export class ContractUpdateWithWhereUniqueWithoutPlanInput {

    @Field(() => ContractWhereUniqueInput, {nullable:false})
    @Type(() => ContractWhereUniqueInput)
    where!: Prisma.AtLeast<ContractWhereUniqueInput, 'id'>;

    @Field(() => ContractUpdateWithoutPlanInput, {nullable:false})
    @Type(() => ContractUpdateWithoutPlanInput)
    data!: ContractUpdateWithoutPlanInput;
}
