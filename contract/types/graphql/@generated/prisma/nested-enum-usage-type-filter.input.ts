import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UsageType } from './usage-type.enum';

@InputType()
export class NestedEnumUsageTypeFilter {

    @Field(() => UsageType, {nullable:true})
    equals?: keyof typeof UsageType;

    @Field(() => [UsageType], {nullable:true})
    in?: Array<keyof typeof UsageType>;

    @Field(() => [UsageType], {nullable:true})
    notIn?: Array<keyof typeof UsageType>;

    @Field(() => NestedEnumUsageTypeFilter, {nullable:true})
    not?: NestedEnumUsageTypeFilter;
}
