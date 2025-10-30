import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Checkout } from '../checkout/checkout.model';
import { ExternalProviderCompanyCount } from './external-provider-company-count.output';

@ObjectType()
export class ExternalProviderCompany {

    @Field(() => ID, {nullable:false})
    companyId!: number;

    @Field(() => String, {nullable:true})
    externalProviderId!: string | null;

    @Field(() => [Checkout], {nullable:true})
    checkout?: Array<Checkout>;

    @Field(() => ExternalProviderCompanyCount, {nullable:false})
    _count?: ExternalProviderCompanyCount;
}
