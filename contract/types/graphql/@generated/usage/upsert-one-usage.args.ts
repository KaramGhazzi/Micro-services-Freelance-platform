import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { UsageWhereUniqueInput } from './usage-where-unique.input';
import { Type } from 'class-transformer';
import { UsageCreateInput } from './usage-create.input';
import { UsageUpdateInput } from './usage-update.input';

@ArgsType()
export class UpsertOneUsageArgs {

    @Field(() => UsageWhereUniqueInput, {nullable:false})
    @Type(() => UsageWhereUniqueInput)
    where!: Prisma.AtLeast<UsageWhereUniqueInput, 'id' | 'companyId_type_objectId'>;

    @Field(() => UsageCreateInput, {nullable:false})
    @Type(() => UsageCreateInput)
    create!: UsageCreateInput;

    @Field(() => UsageUpdateInput, {nullable:false})
    @Type(() => UsageUpdateInput)
    update!: UsageUpdateInput;
}
