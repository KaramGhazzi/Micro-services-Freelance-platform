import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyOrderByWithRelationInput } from './external-provider-company-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { ExternalProviderCompanyWhereUniqueInput } from './external-provider-company-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompanyCountAggregateInput } from './external-provider-company-count-aggregate.input';
import { ExternalProviderCompanyAvgAggregateInput } from './external-provider-company-avg-aggregate.input';
import { ExternalProviderCompanySumAggregateInput } from './external-provider-company-sum-aggregate.input';
import { ExternalProviderCompanyMinAggregateInput } from './external-provider-company-min-aggregate.input';
import { ExternalProviderCompanyMaxAggregateInput } from './external-provider-company-max-aggregate.input';

@ArgsType()
export class ExternalProviderCompanyAggregateArgs {

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereInput)
    where?: ExternalProviderCompanyWhereInput;

    @Field(() => [ExternalProviderCompanyOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ExternalProviderCompanyOrderByWithRelationInput>;

    @Field(() => ExternalProviderCompanyWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ExternalProviderCompanyWhereUniqueInput, 'companyId' | 'externalProviderId'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ExternalProviderCompanyCountAggregateInput, {nullable:true})
    _count?: ExternalProviderCompanyCountAggregateInput;

    @Field(() => ExternalProviderCompanyAvgAggregateInput, {nullable:true})
    _avg?: ExternalProviderCompanyAvgAggregateInput;

    @Field(() => ExternalProviderCompanySumAggregateInput, {nullable:true})
    _sum?: ExternalProviderCompanySumAggregateInput;

    @Field(() => ExternalProviderCompanyMinAggregateInput, {nullable:true})
    _min?: ExternalProviderCompanyMinAggregateInput;

    @Field(() => ExternalProviderCompanyMaxAggregateInput, {nullable:true})
    _max?: ExternalProviderCompanyMaxAggregateInput;
}
