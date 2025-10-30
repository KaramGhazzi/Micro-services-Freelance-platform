import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { LegacyInvoiceCountAggregate } from './legacy-invoice-count-aggregate.output';
import { LegacyInvoiceAvgAggregate } from './legacy-invoice-avg-aggregate.output';
import { LegacyInvoiceSumAggregate } from './legacy-invoice-sum-aggregate.output';
import { LegacyInvoiceMinAggregate } from './legacy-invoice-min-aggregate.output';
import { LegacyInvoiceMaxAggregate } from './legacy-invoice-max-aggregate.output';

@ObjectType()
export class AggregateLegacyInvoice {

    @Field(() => LegacyInvoiceCountAggregate, {nullable:true})
    _count?: LegacyInvoiceCountAggregate;

    @Field(() => LegacyInvoiceAvgAggregate, {nullable:true})
    _avg?: LegacyInvoiceAvgAggregate;

    @Field(() => LegacyInvoiceSumAggregate, {nullable:true})
    _sum?: LegacyInvoiceSumAggregate;

    @Field(() => LegacyInvoiceMinAggregate, {nullable:true})
    _min?: LegacyInvoiceMinAggregate;

    @Field(() => LegacyInvoiceMaxAggregate, {nullable:true})
    _max?: LegacyInvoiceMaxAggregate;
}
