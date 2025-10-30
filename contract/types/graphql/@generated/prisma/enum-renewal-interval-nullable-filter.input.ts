import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RenewalInterval } from './renewal-interval.enum';
import { NestedEnumRenewalIntervalNullableFilter } from './nested-enum-renewal-interval-nullable-filter.input';

@InputType()
export class EnumRenewalIntervalNullableFilter {

    @Field(() => RenewalInterval, {nullable:true})
    equals?: keyof typeof RenewalInterval;

    @Field(() => [RenewalInterval], {nullable:true})
    in?: Array<keyof typeof RenewalInterval>;

    @Field(() => [RenewalInterval], {nullable:true})
    notIn?: Array<keyof typeof RenewalInterval>;

    @Field(() => NestedEnumRenewalIntervalNullableFilter, {nullable:true})
    not?: NestedEnumRenewalIntervalNullableFilter;
}
