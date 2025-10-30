import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';

@InputType()
export class UsageUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => UsageType, {nullable:false})
    type!: keyof typeof UsageType;

    @Field(() => Int, {nullable:false})
    amount!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Date, {nullable:true})
    created?: Date | string;

    @Field(() => Int, {nullable:true})
    objectId?: number;
}
