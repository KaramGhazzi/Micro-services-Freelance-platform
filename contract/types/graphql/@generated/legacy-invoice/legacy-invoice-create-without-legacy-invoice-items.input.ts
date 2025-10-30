import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceStatus } from '../prisma/legacy-invoice-status.enum';

@InputType()
export class LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput {

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
}
