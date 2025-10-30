import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UsageType } from './usage-type.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumUsageTypeFilter } from './nested-enum-usage-type-filter.input';

@InputType()
export class NestedEnumUsageTypeWithAggregatesFilter {

    @Field(() => UsageType, {nullable:true})
    equals?: keyof typeof UsageType;

    @Field(() => [UsageType], {nullable:true})
    in?: Array<keyof typeof UsageType>;

    @Field(() => [UsageType], {nullable:true})
    notIn?: Array<keyof typeof UsageType>;

    @Field(() => NestedEnumUsageTypeWithAggregatesFilter, {nullable:true})
    not?: NestedEnumUsageTypeWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumUsageTypeFilter, {nullable:true})
    _min?: NestedEnumUsageTypeFilter;

    @Field(() => NestedEnumUsageTypeFilter, {nullable:true})
    _max?: NestedEnumUsageTypeFilter;
}
