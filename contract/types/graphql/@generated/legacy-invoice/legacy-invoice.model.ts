import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceStatus } from '../prisma/legacy-invoice-status.enum';
import { LegacyInvoiceItem } from '../legacy-invoice-item/legacy-invoice-item.model';
import { LegacyInvoiceCount } from './legacy-invoice-count.output';

@ObjectType()
export class LegacyInvoice {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => String, {nullable:true})
    firstName!: string | null;

    @Field(() => String, {nullable:true})
    lastName!: string | null;

    @Field(() => String, {nullable:true})
    addressLine1!: string | null;

    @Field(() => String, {nullable:true})
    addressLine2!: string | null;

    @Field(() => String, {nullable:true})
    postalCode!: string | null;

    @Field(() => String, {nullable:true})
    city!: string | null;

    @Field(() => LegacyInvoiceStatus, {nullable:false})
    status!: keyof typeof LegacyInvoiceStatus;

    @Field(() => [LegacyInvoiceItem], {nullable:true})
    legacyInvoiceItems?: Array<LegacyInvoiceItem>;

    @Field(() => LegacyInvoiceCount, {nullable:false})
    _count?: LegacyInvoiceCount;
}
