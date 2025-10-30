import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceStatus } from './legacy-invoice-status.enum';

@InputType()
export class NestedEnumLegacyInvoiceStatusFilter {

    @Field(() => LegacyInvoiceStatus, {nullable:true})
    equals?: keyof typeof LegacyInvoiceStatus;

    @Field(() => [LegacyInvoiceStatus], {nullable:true})
    in?: Array<keyof typeof LegacyInvoiceStatus>;

    @Field(() => [LegacyInvoiceStatus], {nullable:true})
    notIn?: Array<keyof typeof LegacyInvoiceStatus>;

    @Field(() => NestedEnumLegacyInvoiceStatusFilter, {nullable:true})
    not?: NestedEnumLegacyInvoiceStatusFilter;
}
