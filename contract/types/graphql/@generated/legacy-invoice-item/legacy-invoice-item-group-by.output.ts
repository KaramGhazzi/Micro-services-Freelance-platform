import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemCode } from '../prisma/legacy-invoice-item-code.enum';
import { LegacyInvoiceItemCountAggregate } from './legacy-invoice-item-count-aggregate.output';
import { LegacyInvoiceItemAvgAggregate } from './legacy-invoice-item-avg-aggregate.output';
import { LegacyInvoiceItemSumAggregate } from './legacy-invoice-item-sum-aggregate.output';
import { LegacyInvoiceItemMinAggregate } from './legacy-invoice-item-min-aggregate.output';
import { LegacyInvoiceItemMaxAggregate } from './legacy-invoice-item-max-aggregate.output';

@ObjectType()
export class LegacyInvoiceItemGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    legacyInvoiceId!: number;

    @Field(() => Int, {nullable:true})
    contractId?: number;

    @Field(() => LegacyInvoiceItemCode, {nullable:false})
    invoiceItemCode!: keyof typeof LegacyInvoiceItemCode;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Date, {nullable:true})
    startDate?: Date | string;

    @Field(() => Date, {nullable:true})
    endDate?: Date | string;

    @Field(() => Int, {nullable:false})
    amount!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:false})
    taxPercent!: number;

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
