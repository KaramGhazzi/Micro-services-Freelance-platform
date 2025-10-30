import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyOrderByWithAggregationInput } from './external-provider-company-order-by-with-aggregation.input';
import { ExternalProviderCompanyScalarFieldEnum } from './external-provider-company-scalar-field.enum';
import { ExternalProviderCompanyScalarWhereWithAggregatesInput } from './external-provider-company-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompanyCountAggregateInput } from './external-provider-company-count-aggregate.input';
import { ExternalProviderCompanyAvgAggregateInput } from './external-provider-company-avg-aggregate.input';
import { ExternalProviderCompanySumAggregateInput } from './external-provider-company-sum-aggregate.input';
import { ExternalProviderCompanyMinAggregateInput } from './external-provider-company-min-aggregate.input';
import { ExternalProviderCompanyMaxAggregateInput } from './external-provider-company-max-aggregate.input';

@ArgsType()
export class ExternalProviderCompanyGroupByArgs {

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereInput)
    where?: ExternalProviderCompanyWhereInput;

    @Field(() => [ExternalProviderCompanyOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ExternalProviderCompanyOrderByWithAggregationInput>;

    @Field(() => [ExternalProviderCompanyScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ExternalProviderCompanyScalarFieldEnum>;

    @Field(() => ExternalProviderCompanyScalarWhereWithAggregatesInput, {nullable:true})
    having?: ExternalProviderCompanyScalarWhereWithAggregatesInput;

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
