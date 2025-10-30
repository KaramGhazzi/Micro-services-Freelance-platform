import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageCompanyIdTypeObjectIdCompoundUniqueInput } from './usage-company-id-type-object-id-compound-unique.input';
import { UsageWhereInput } from './usage-where.input';
import { EnumUsageTypeFilter } from '../prisma/enum-usage-type-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';

@InputType()
export class UsageWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => UsageCompanyIdTypeObjectIdCompoundUniqueInput, {nullable:true})
    companyId_type_objectId?: UsageCompanyIdTypeObjectIdCompoundUniqueInput;

    @Field(() => [UsageWhereInput], {nullable:true})
    AND?: Array<UsageWhereInput>;

    @Field(() => [UsageWhereInput], {nullable:true})
    OR?: Array<UsageWhereInput>;

    @Field(() => [UsageWhereInput], {nullable:true})
    NOT?: Array<UsageWhereInput>;

    @Field(() => EnumUsageTypeFilter, {nullable:true})
    type?: EnumUsageTypeFilter;

    @Field(() => IntFilter, {nullable:true})
    amount?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    companyId?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created?: DateTimeFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    objectId?: IntNullableFilter;
}
