import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceItemWhereInput } from './legacy-invoice-item-where.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemOrderByWithRelationInput } from './legacy-invoice-item-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemCountAggregateInput } from './legacy-invoice-item-count-aggregate.input';
import { LegacyInvoiceItemAvgAggregateInput } from './legacy-invoice-item-avg-aggregate.input';
import { LegacyInvoiceItemSumAggregateInput } from './legacy-invoice-item-sum-aggregate.input';
import { LegacyInvoiceItemMinAggregateInput } from './legacy-invoice-item-min-aggregate.input';
import { LegacyInvoiceItemMaxAggregateInput } from './legacy-invoice-item-max-aggregate.input';

@ArgsType()
export class LegacyInvoiceItemAggregateArgs {

    @Field(() => LegacyInvoiceItemWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceItemWhereInput)
    where?: LegacyInvoiceItemWhereInput;

    @Field(() => [LegacyInvoiceItemOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LegacyInvoiceItemOrderByWithRelationInput>;

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => LegacyInvoiceItemCountAggregateInput, {nullable:true})
    _count?: LegacyInvoiceItemCountAggregateInput;

    @Field(() => LegacyInvoiceItemAvgAggregateInput, {nullable:true})
    _avg?: LegacyInvoiceItemAvgAggregateInput;

    @Field(() => LegacyInvoiceItemSumAggregateInput, {nullable:true})
    _sum?: LegacyInvoiceItemSumAggregateInput;

    @Field(() => LegacyInvoiceItemMinAggregateInput, {nullable:true})
    _min?: LegacyInvoiceItemMinAggregateInput;

    @Field(() => LegacyInvoiceItemMaxAggregateInput, {nullable:true})
    _max?: LegacyInvoiceItemMaxAggregateInput;
}
