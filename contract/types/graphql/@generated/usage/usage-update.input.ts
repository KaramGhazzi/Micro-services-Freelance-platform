import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Int } from '@nestjs/graphql';

@InputType()
export class UsageUpdateInput {

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
