import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ExternalProviderCompanyCount {

    @Field(() => Int, {nullable:false})
    checkout?: number;
}
