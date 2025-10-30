import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ContractCreateManyPlanInput } from './contract-create-many-plan.input';
import { Type } from 'class-transformer';

@InputType()
export class ContractCreateManyPlanInputEnvelope {

    @Field(() => [ContractCreateManyPlanInput], {nullable:false})
    @Type(() => ContractCreateManyPlanInput)
    data!: Array<ContractCreateManyPlanInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
