import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageCreateManyInput } from './usage-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyUsageArgs {

    @Field(() => [UsageCreateManyInput], {nullable:false})
    @Type(() => UsageCreateManyInput)
    data!: Array<UsageCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
