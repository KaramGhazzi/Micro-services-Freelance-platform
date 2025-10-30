import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageUpdateInput } from './usage-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@freelance/contract/client';
import { UsageWhereUniqueInput } from './usage-where-unique.input';

@ArgsType()
export class UpdateOneUsageArgs {

    @Field(() => UsageUpdateInput, {nullable:false})
    @Type(() => UsageUpdateInput)
    data!: UsageUpdateInput;

    @Field(() => UsageWhereUniqueInput, {nullable:false})
    @Type(() => UsageWhereUniqueInput)
    where!: Prisma.AtLeast<UsageWhereUniqueInput, 'id' | 'companyId_type_objectId'>;
}
