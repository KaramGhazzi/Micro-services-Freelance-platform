import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { LegacyInvoiceItemCountAggregate } from './legacy-invoice-item-count-aggregate.output';
import { LegacyInvoiceItemAvgAggregate } from './legacy-invoice-item-avg-aggregate.output';
import { LegacyInvoiceItemSumAggregate } from './legacy-invoice-item-sum-aggregate.output';
import { LegacyInvoiceItemMinAggregate } from './legacy-invoice-item-min-aggregate.output';
import { LegacyInvoiceItemMaxAggregate } from './legacy-invoice-item-max-aggregate.output';

@ObjectType()
export class AggregateLegacyInvoiceItem {

    @Field(() => LegacyInvoiceItemCountAggregate, {nullable:true})
    _count?: LegacyInvoiceItemCountAggregate;

    @Field(() => LegacyInvoiceItemAvgAggregate, {nullable:true})
    _avg?: LegacyInvoiceItemAvgAggregate;

    @Field(() => LegacyInvoiceItemSumAggregate, {nullable:true})
    _sum?: LegacyInvoiceItemSumAggregate;

    @Field(() => LegacyInvoiceItemMinAggregate, {nullable:true})
    _min?: LegacyInvoiceItemMinAggregate;

    @Field(() => LegacyInvoiceItemMaxAggregate, {nullable:true})
    _max?: LegacyInvoiceItemMaxAggregate;
}
