import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RenewalInterval } from './renewal-interval.enum';

@InputType()
export class NestedEnumRenewalIntervalNullableFilter {

    @Field(() => RenewalInterval, {nullable:true})
    equals?: keyof typeof RenewalInterval;

    @Field(() => [RenewalInterval], {nullable:true})
    in?: Array<keyof typeof RenewalInterval>;

    @Field(() => [RenewalInterval], {nullable:true})
    notIn?: Array<keyof typeof RenewalInterval>;

    @Field(() => NestedEnumRenewalIntervalNullableFilter, {nullable:true})
    not?: NestedEnumRenewalIntervalNullableFilter;
}
