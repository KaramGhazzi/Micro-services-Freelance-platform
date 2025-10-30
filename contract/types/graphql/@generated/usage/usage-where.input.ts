import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumUsageTypeFilter } from '../prisma/enum-usage-type-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';

@InputType()
export class UsageWhereInput {

    @Field(() => [UsageWhereInput], {nullable:true})
    AND?: Array<UsageWhereInput>;

    @Field(() => [UsageWhereInput], {nullable:true})
    OR?: Array<UsageWhereInput>;

    @Field(() => [UsageWhereInput], {nullable:true})
    NOT?: Array<UsageWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

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
