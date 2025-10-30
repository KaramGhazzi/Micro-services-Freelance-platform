import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContractCreateManyInput } from './contract-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyContractArgs {

    @Field(() => [ContractCreateManyInput], {nullable:false})
    @Type(() => ContractCreateManyInput)
    data!: Array<ContractCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
