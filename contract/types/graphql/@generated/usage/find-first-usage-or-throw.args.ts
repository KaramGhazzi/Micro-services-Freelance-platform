import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UsageWhereInput } from './usage-where.input';
import { Type } from 'class-transformer';
import { UsageOrderByWithRelationInput } from './usage-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { UsageWhereUniqueInput } from './usage-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UsageScalarFieldEnum } from './usage-scalar-field.enum';

@ArgsType()
export class FindFirstUsageOrThrowArgs {

    @Field(() => UsageWhereInput, {nullable:true})
    @Type(() => UsageWhereInput)
    where?: UsageWhereInput;

    @Field(() => [UsageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UsageOrderByWithRelationInput>;

    @Field(() => UsageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UsageWhereUniqueInput, 'id' | 'companyId_type_objectId'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UsageScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof UsageScalarFieldEnum>;
}
