import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Usage {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => UsageType, {nullable:false})
    type!: keyof typeof UsageType;

    @Field(() => Int, {nullable:false})
    amount!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Date, {nullable:false})
    created!: Date;

    @Field(() => Int, {nullable:true})
    objectId!: number | null;
}
