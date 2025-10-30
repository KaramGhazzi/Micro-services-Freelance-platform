import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ExternalProviderCompanyCountAggregate } from './external-provider-company-count-aggregate.output';
import { ExternalProviderCompanyAvgAggregate } from './external-provider-company-avg-aggregate.output';
import { ExternalProviderCompanySumAggregate } from './external-provider-company-sum-aggregate.output';
import { ExternalProviderCompanyMinAggregate } from './external-provider-company-min-aggregate.output';
import { ExternalProviderCompanyMaxAggregate } from './external-provider-company-max-aggregate.output';

@ObjectType()
export class AggregateExternalProviderCompany {

    @Field(() => ExternalProviderCompanyCountAggregate, {nullable:true})
    _count?: ExternalProviderCompanyCountAggregate;

    @Field(() => ExternalProviderCompanyAvgAggregate, {nullable:true})
    _avg?: ExternalProviderCompanyAvgAggregate;

    @Field(() => ExternalProviderCompanySumAggregate, {nullable:true})
    _sum?: ExternalProviderCompanySumAggregate;

    @Field(() => ExternalProviderCompanyMinAggregate, {nullable:true})
    _min?: ExternalProviderCompanyMinAggregate;

    @Field(() => ExternalProviderCompanyMaxAggregate, {nullable:true})
    _max?: ExternalProviderCompanyMaxAggregate;
}
