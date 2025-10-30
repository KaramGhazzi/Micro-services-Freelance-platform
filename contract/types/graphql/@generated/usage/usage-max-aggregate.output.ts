import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';

@ObjectType()
export class UsageMaxAggregate {

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
