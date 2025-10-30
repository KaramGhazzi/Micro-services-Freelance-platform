import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ExternalProviderCompanyAvgAggregate {

    @Field(() => Float, {nullable:true})
    companyId?: number;
}
