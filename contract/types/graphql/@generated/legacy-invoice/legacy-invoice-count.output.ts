import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LegacyInvoiceCount {

    @Field(() => Int, {nullable:false})
    legacyInvoiceItems?: number;
}
