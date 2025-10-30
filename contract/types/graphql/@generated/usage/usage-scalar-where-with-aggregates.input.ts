import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { EnumUsageTypeWithAggregatesFilter } from '../prisma/enum-usage-type-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';

@InputType()
export class UsageScalarWhereWithAggregatesInput {

    @Field(() => [UsageScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UsageScalarWhereWithAggregatesInput>;

    @Field(() => [UsageScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UsageScalarWhereWithAggregatesInput>;

    @Field(() => [UsageScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UsageScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => EnumUsageTypeWithAggregatesFilter, {nullable:true})
    type?: EnumUsageTypeWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    amount?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    companyId?: IntWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    created?: DateTimeWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    objectId?: IntNullableWithAggregatesFilter;
}
