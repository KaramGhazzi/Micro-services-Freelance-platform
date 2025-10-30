import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageWhereInput } from './usage-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyUsageArgs {

    @Field(() => UsageWhereInput, {nullable:true})
    @Type(() => UsageWhereInput)
    where?: UsageWhereInput;
}
