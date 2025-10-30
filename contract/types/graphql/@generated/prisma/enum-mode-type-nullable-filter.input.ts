import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ModeType } from './mode-type.enum';
import { NestedEnumModeTypeNullableFilter } from './nested-enum-mode-type-nullable-filter.input';

@InputType()
export class EnumModeTypeNullableFilter {

    @Field(() => ModeType, {nullable:true})
    equals?: keyof typeof ModeType;

    @Field(() => [ModeType], {nullable:true})
    in?: Array<keyof typeof ModeType>;

    @Field(() => [ModeType], {nullable:true})
    notIn?: Array<keyof typeof ModeType>;

    @Field(() => NestedEnumModeTypeNullableFilter, {nullable:true})
    not?: NestedEnumModeTypeNullableFilter;
}
