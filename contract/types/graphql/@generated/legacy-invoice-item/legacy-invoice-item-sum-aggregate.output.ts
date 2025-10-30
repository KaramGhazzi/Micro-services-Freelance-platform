import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LegacyInvoiceItemSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    legacyInvoiceId?: number;

    @Field(() => Int, {nullable:true})
    contractId?: number;

    @Field(() => Int, {nullable:true})
    amount?: number;

    @Field(() => Int, {nullable:true})
    price?: number;

    @Field(() => Int, {nullable:true})
    taxPercent?: number;
}
