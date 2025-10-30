import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';

@InputType()
export class UsageUncheckedUpdateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => UsageType, {nullable:true})
    type?: keyof typeof UsageType;

    @Field(() => Int, {nullable:true})
    amount?: number;

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => Date, {nullable:true})
    created?: Date | string;

    @Field(() => Int, {nullable:true})
    objectId?: number;
}
