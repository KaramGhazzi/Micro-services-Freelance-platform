import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { UsageWhereUniqueInput } from './usage-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueUsageArgs {

    @Field(() => UsageWhereUniqueInput, {nullable:false})
    @Type(() => UsageWhereUniqueInput)
    where!: Prisma.AtLeast<UsageWhereUniqueInput, 'id' | 'companyId_type_objectId'>;
}
