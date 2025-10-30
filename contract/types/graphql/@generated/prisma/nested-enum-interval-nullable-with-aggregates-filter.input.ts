import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Interval } from './interval.enum';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';
import { NestedEnumIntervalNullableFilter } from './nested-enum-interval-nullable-filter.input';

@InputType()
export class NestedEnumIntervalNullableWithAggregatesFilter {

    @Field(() => Interval, {nullable:true})
    equals?: keyof typeof Interval;

    @Field(() => [Interval], {nullable:true})
    in?: Array<keyof typeof Interval>;

    @Field(() => [Interval], {nullable:true})
    notIn?: Array<keyof typeof Interval>;

    @Field(() => NestedEnumIntervalNullableWithAggregatesFilter, {nullable:true})
    not?: NestedEnumIntervalNullableWithAggregatesFilter;

    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: NestedIntNullableFilter;

    @Field(() => NestedEnumIntervalNullableFilter, {nullable:true})
    _min?: NestedEnumIntervalNullableFilter;

    @Field(() => NestedEnumIntervalNullableFilter, {nullable:true})
    _max?: NestedEnumIntervalNullableFilter;
}
