import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceOrderByWithRelationInput } from './legacy-invoice-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceCountAggregateInput } from './legacy-invoice-count-aggregate.input';
import { LegacyInvoiceAvgAggregateInput } from './legacy-invoice-avg-aggregate.input';
import { LegacyInvoiceSumAggregateInput } from './legacy-invoice-sum-aggregate.input';
import { LegacyInvoiceMinAggregateInput } from './legacy-invoice-min-aggregate.input';
import { LegacyInvoiceMaxAggregateInput } from './legacy-invoice-max-aggregate.input';

@ArgsType()
export class LegacyInvoiceAggregateArgs {

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereInput)
    where?: LegacyInvoiceWhereInput;

    @Field(() => [LegacyInvoiceOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LegacyInvoiceOrderByWithRelationInput>;

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => LegacyInvoiceCountAggregateInput, {nullable:true})
    _count?: LegacyInvoiceCountAggregateInput;

    @Field(() => LegacyInvoiceAvgAggregateInput, {nullable:true})
    _avg?: LegacyInvoiceAvgAggregateInput;

    @Field(() => LegacyInvoiceSumAggregateInput, {nullable:true})
    _sum?: LegacyInvoiceSumAggregateInput;

    @Field(() => LegacyInvoiceMinAggregateInput, {nullable:true})
    _min?: LegacyInvoiceMinAggregateInput;

    @Field(() => LegacyInvoiceMaxAggregateInput, {nullable:true})
    _max?: LegacyInvoiceMaxAggregateInput;
}
