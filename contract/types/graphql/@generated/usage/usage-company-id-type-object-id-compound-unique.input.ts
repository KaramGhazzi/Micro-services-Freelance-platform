import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsageType } from '../prisma/usage-type.enum';

@InputType()
export class UsageCompanyIdTypeObjectIdCompoundUniqueInput {

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => UsageType, {nullable:false})
    type!: keyof typeof UsageType;

    @Field(() => Int, {nullable:false})
    objectId!: number;
}
