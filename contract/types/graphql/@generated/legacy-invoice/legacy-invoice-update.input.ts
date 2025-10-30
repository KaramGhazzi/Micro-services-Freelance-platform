import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceStatus } from '../prisma/legacy-invoice-status.enum';
import { LegacyInvoiceItemUpdateManyWithoutLegacyInvoiceNestedInput } from '../legacy-invoice-item/legacy-invoice-item-update-many-without-legacy-invoice-nested.input';

@InputType()
export class LegacyInvoiceUpdateInput {

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

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

    @Field(() => LegacyInvoiceStatus, {nullable:true})
    status?: keyof typeof LegacyInvoiceStatus;

    @Field(() => LegacyInvoiceItemUpdateManyWithoutLegacyInvoiceNestedInput, {nullable:true})
    legacyInvoiceItems?: LegacyInvoiceItemUpdateManyWithoutLegacyInvoiceNestedInput;
}
