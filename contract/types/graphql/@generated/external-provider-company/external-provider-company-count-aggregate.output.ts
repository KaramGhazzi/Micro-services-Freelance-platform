import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ExternalProviderCompanyCountAggregate {

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Int, {nullable:false})
    externalProviderId!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
