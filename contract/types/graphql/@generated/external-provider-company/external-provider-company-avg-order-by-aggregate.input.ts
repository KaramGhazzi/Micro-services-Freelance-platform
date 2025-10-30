import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ExternalProviderCompanyAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    companyId?: keyof typeof SortOrder;
}
