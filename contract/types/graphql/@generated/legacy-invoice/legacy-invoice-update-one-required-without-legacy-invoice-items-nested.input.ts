import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput } from './legacy-invoice-create-without-legacy-invoice-items.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput } from './legacy-invoice-create-or-connect-without-legacy-invoice-items.input';
import { LegacyInvoiceUpsertWithoutLegacyInvoiceItemsInput } from './legacy-invoice-upsert-without-legacy-invoice-items.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';
import { LegacyInvoiceUpdateToOneWithWhereWithoutLegacyInvoiceItemsInput } from './legacy-invoice-update-to-one-with-where-without-legacy-invoice-items.input';

@InputType()
export class LegacyInvoiceUpdateOneRequiredWithoutLegacyInvoiceItemsNestedInput {

    @Field(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput, {nullable:true})
    @Type(() => LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput)
    create?: LegacyInvoiceCreateWithoutLegacyInvoiceItemsInput;

    @Field(() => LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput, {nullable:true})
    @Type(() => LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput)
    connectOrCreate?: LegacyInvoiceCreateOrConnectWithoutLegacyInvoiceItemsInput;

    @Field(() => LegacyInvoiceUpsertWithoutLegacyInvoiceItemsInput, {nullable:true})
    @Type(() => LegacyInvoiceUpsertWithoutLegacyInvoiceItemsInput)
    upsert?: LegacyInvoiceUpsertWithoutLegacyInvoiceItemsInput;

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereUniqueInput)
    connect?: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;

    @Field(() => LegacyInvoiceUpdateToOneWithWhereWithoutLegacyInvoiceItemsInput, {nullable:true})
    @Type(() => LegacyInvoiceUpdateToOneWithWhereWithoutLegacyInvoiceItemsInput)
    update?: LegacyInvoiceUpdateToOneWithWhereWithoutLegacyInvoiceItemsInput;
}
