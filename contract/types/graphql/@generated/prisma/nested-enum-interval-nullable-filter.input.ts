import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Interval } from './interval.enum';

@InputType()
export class NestedEnumIntervalNullableFilter {

    @Field(() => Interval, {nullable:true})
    equals?: keyof typeof Interval;

    @Field(() => [Interval], {nullable:true})
    in?: Array<keyof typeof Interval>;

    @Field(() => [Interval], {nullable:true})
    notIn?: Array<keyof typeof Interval>;

    @Field(() => NestedEnumIntervalNullableFilter, {nullable:true})
    not?: NestedEnumIntervalNullableFilter;
}
