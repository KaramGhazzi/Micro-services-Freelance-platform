import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceItemWhereInput } from './legacy-invoice-item-where.input';

@InputType()
export class LegacyInvoiceItemListRelationFilter {

    @Field(() => LegacyInvoiceItemWhereInput, {nullable:true})
    every?: LegacyInvoiceItemWhereInput;

    @Field(() => LegacyInvoiceItemWhereInput, {nullable:true})
    some?: LegacyInvoiceItemWhereInput;

    @Field(() => LegacyInvoiceItemWhereInput, {nullable:true})
    none?: LegacyInvoiceItemWhereInput;
}
