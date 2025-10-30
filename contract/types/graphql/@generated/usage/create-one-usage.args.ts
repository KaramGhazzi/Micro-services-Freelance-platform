import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageCreateInput } from './usage-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneUsageArgs {

    @Field(() => UsageCreateInput, {nullable:false})
    @Type(() => UsageCreateInput)
    data!: UsageCreateInput;
}
