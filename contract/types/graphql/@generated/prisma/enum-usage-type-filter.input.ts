import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UsageType } from './usage-type.enum';
import { NestedEnumUsageTypeFilter } from './nested-enum-usage-type-filter.input';

@InputType()
export class EnumUsageTypeFilter {

    @Field(() => UsageType, {nullable:true})
    equals?: keyof typeof UsageType;

    @Field(() => [UsageType], {nullable:true})
    in?: Array<keyof typeof UsageType>;

    @Field(() => [UsageType], {nullable:true})
    notIn?: Array<keyof typeof UsageType>;

    @Field(() => NestedEnumUsageTypeFilter, {nullable:true})
    not?: NestedEnumUsageTypeFilter;
}
