import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';

@InputType()
export class LegacyInvoiceRelationFilter {

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    is?: LegacyInvoiceWhereInput;

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    isNot?: LegacyInvoiceWhereInput;
}
