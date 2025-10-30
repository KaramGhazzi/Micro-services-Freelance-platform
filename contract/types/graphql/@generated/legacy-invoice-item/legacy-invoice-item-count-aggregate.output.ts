import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LegacyInvoiceItemCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    legacyInvoiceId!: number;

    @Field(() => Int, {nullable:false})
    contractId!: number;

    @Field(() => Int, {nullable:false})
    invoiceItemCode!: number;

    @Field(() => Int, {nullable:false})
    description!: number;

    @Field(() => Int, {nullable:false})
    startDate!: number;

    @Field(() => Int, {nullable:false})
    endDate!: number;

    @Field(() => Int, {nullable:false})
    amount!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:false})
    taxPercent!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
