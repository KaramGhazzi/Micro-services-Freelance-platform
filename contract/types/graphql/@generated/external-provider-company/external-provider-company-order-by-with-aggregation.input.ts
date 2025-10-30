import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ExternalProviderCompanyCountOrderByAggregateInput } from './external-provider-company-count-order-by-aggregate.input';
import { ExternalProviderCompanyAvgOrderByAggregateInput } from './external-provider-company-avg-order-by-aggregate.input';
import { ExternalProviderCompanyMaxOrderByAggregateInput } from './external-provider-company-max-order-by-aggregate.input';
import { ExternalProviderCompanyMinOrderByAggregateInput } from './external-provider-company-min-order-by-aggregate.input';
import { ExternalProviderCompanySumOrderByAggregateInput } from './external-provider-company-sum-order-by-aggregate.input';

@InputType()
export class ExternalProviderCompanyOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    externalProviderId?: SortOrderInput;

    @Field(() => ExternalProviderCompanyCountOrderByAggregateInput, {nullable:true})
    _count?: ExternalProviderCompanyCountOrderByAggregateInput;

    @Field(() => ExternalProviderCompanyAvgOrderByAggregateInput, {nullable:true})
    _avg?: ExternalProviderCompanyAvgOrderByAggregateInput;

    @Field(() => ExternalProviderCompanyMaxOrderByAggregateInput, {nullable:true})
    _max?: ExternalProviderCompanyMaxOrderByAggregateInput;

    @Field(() => ExternalProviderCompanyMinOrderByAggregateInput, {nullable:true})
    _min?: ExternalProviderCompanyMinOrderByAggregateInput;

    @Field(() => ExternalProviderCompanySumOrderByAggregateInput, {nullable:true})
    _sum?: ExternalProviderCompanySumOrderByAggregateInput;
}
