import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ModeType } from './mode-type.enum';
import { NestedEnumModeTypeNullableWithAggregatesFilter } from './nested-enum-mode-type-nullable-with-aggregates-filter.input';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';
import { NestedEnumModeTypeNullableFilter } from './nested-enum-mode-type-nullable-filter.input';

@InputType()
export class EnumModeTypeNullableWithAggregatesFilter {

    @Field(() => ModeType, {nullable:true})
    equals?: keyof typeof ModeType;

    @Field(() => [ModeType], {nullable:true})
    in?: Array<keyof typeof ModeType>;

    @Field(() => [ModeType], {nullable:true})
    notIn?: Array<keyof typeof ModeType>;

    @Field(() => NestedEnumModeTypeNullableWithAggregatesFilter, {nullable:true})
    not?: NestedEnumModeTypeNullableWithAggregatesFilter;

    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: NestedIntNullableFilter;

    @Field(() => NestedEnumModeTypeNullableFilter, {nullable:true})
    _min?: NestedEnumModeTypeNullableFilter;

    @Field(() => NestedEnumModeTypeNullableFilter, {nullable:true})
    _max?: NestedEnumModeTypeNullableFilter;
}
