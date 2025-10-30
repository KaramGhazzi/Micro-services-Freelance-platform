import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceStatus } from '../prisma/legacy-invoice-status.enum';
import { LegacyInvoiceCountAggregate } from './legacy-invoice-count-aggregate.output';
import { LegacyInvoiceAvgAggregate } from './legacy-invoice-avg-aggregate.output';
import { LegacyInvoiceSumAggregate } from './legacy-invoice-sum-aggregate.output';
import { LegacyInvoiceMinAggregate } from './legacy-invoice-min-aggregate.output';
import { LegacyInvoiceMaxAggregate } from './legacy-invoice-max-aggregate.output';

@ObjectType()
export class LegacyInvoiceGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => String, {nullable:true})
    firstName?: string;

    @Field(() => String, {nullable:true})
    lastName?: string;

    @Field(() => String, {nullable:true})
    addressLine1?: string;

    @Field(() => String, {nullable:true})
    addressLine2?: string;

    @Field(() => String, {nullable:true})
    postalCode?: string;

    @Field(() => String, {nullable:true})
    city?: string;

    @Field(() => LegacyInvoiceStatus, {nullable:false})
    status!: keyof typeof LegacyInvoiceStatus;

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
