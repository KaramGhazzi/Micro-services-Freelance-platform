import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { CheckoutOrderByRelationAggregateInput } from '../checkout/checkout-order-by-relation-aggregate.input';

@InputType()
export class ExternalProviderCompanyOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    externalProviderId?: SortOrderInput;

    @Field(() => CheckoutOrderByRelationAggregateInput, {nullable:true})
    checkout?: CheckoutOrderByRelationAggregateInput;
}
