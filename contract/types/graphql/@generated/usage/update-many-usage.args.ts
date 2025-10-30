import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageUpdateManyMutationInput } from './usage-update-many-mutation.input';
import { Type } from 'class-transformer';
import { UsageWhereInput } from './usage-where.input';

@ArgsType()
export class UpdateManyUsageArgs {

    @Field(() => UsageUpdateManyMutationInput, {nullable:false})
    @Type(() => UsageUpdateManyMutationInput)
    data!: UsageUpdateManyMutationInput;

    @Field(() => UsageWhereInput, {nullable:true})
    @Type(() => UsageWhereInput)
    where?: UsageWhereInput;
}
