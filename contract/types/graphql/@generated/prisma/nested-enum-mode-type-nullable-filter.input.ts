import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ModeType } from './mode-type.enum';

@InputType()
export class NestedEnumModeTypeNullableFilter {

    @Field(() => ModeType, {nullable:true})
    equals?: keyof typeof ModeType;

    @Field(() => [ModeType], {nullable:true})
    in?: Array<keyof typeof ModeType>;

    @Field(() => [ModeType], {nullable:true})
    notIn?: Array<keyof typeof ModeType>;

    @Field(() => NestedEnumModeTypeNullableFilter, {nullable:true})
    not?: NestedEnumModeTypeNullableFilter;
}
