import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput } from './legacy-invoice-create-without-legacy-invoice-items.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput } from './legacy-invoice-create-or-connect-without-legacy-invoice-items.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';

@InputType()
export class LegacyInvoiceCreateNestedOneWithoutLegacyInvoiceItemsInput {

    @Field(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput, {nullable:true})
    @Type(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput)
    create?: LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput;

    @Field(() => LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput, {nullable:true})
    @Type(() => LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput)
    connectOrCreate?: LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput;

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereUniqueInput)
    connect?: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;
}
