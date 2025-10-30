import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ExternalProviderCompanyMinAggregate {

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;
}
