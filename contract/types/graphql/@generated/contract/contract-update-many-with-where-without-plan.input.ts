import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ContractScalarWhereInput } from './contract-scalar-where.input';
import { Type } from 'class-transformer';
import { ContractUpdateManyMutationInput } from './contract-update-many-mutation.input';

@InputType()
export class ContractUpdateManyWithWhereWithoutPlanInput {

    @Field(() => ContractScalarWhereInput, {nullable:false})
    @Type(() => ContractScalarWhereInput)
    where!: ContractScalarWhereInput;

    @Field(() => ContractUpdateManyMutationInput, {nullable:false})
    @Type(() => ContractUpdateManyMutationInput)
    data!: ContractUpdateManyMutationInput;
}
