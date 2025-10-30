import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RenewalInterval } from './renewal-interval.enum';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';
import { NestedEnumRenewalIntervalNullableFilter } from './nested-enum-renewal-interval-nullable-filter.input';

@InputType()
export class NestedEnumRenewalIntervalNullableWithAggregatesFilter {

    @Field(() => RenewalInterval, {nullable:true})
    equals?: keyof typeof RenewalInterval;

    @Field(() => [RenewalInterval], {nullable:true})
    in?: Array<keyof typeof RenewalInterval>;

    @Field(() => [RenewalInterval], {nullable:true})
    notIn?: Array<keyof typeof RenewalInterval>;

    @Field(() => NestedEnumRenewalIntervalNullableWithAggregatesFilter, {nullable:true})
    not?: NestedEnumRenewalIntervalNullableWithAggregatesFilter;

    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: NestedIntNullableFilter;

    @Field(() => NestedEnumRenewalIntervalNullableFilter, {nullable:true})
    _min?: NestedEnumRenewalIntervalNullableFilter;

    @Field(() => NestedEnumRenewalIntervalNullableFilter, {nullable:true})
    _max?: NestedEnumRenewalIntervalNullableFilter;
}
