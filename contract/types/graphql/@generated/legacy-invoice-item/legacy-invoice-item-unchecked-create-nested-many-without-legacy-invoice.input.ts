import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceItemCreateWithoutLegacyInvoiceInput } from './legacy-invoice-item-create-without-legacy-invoice.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput } from './legacy-invoice-item-create-or-connect-without-legacy-invoice.input';
import { LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope } from './legacy-invoice-item-create-many-legacy-invoice-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';

@InputType()
export class LegacyInvoiceItemUncheckedCreateNestedManyWithoutLegacyInvoiceInput {

    @Field(() => [LegacyInvoiceItemCreateWithoutLegacyInvoiceInput], {nullable:true})
    @Type(() => LegacyInvoiceItemCreateWithoutLegacyInvoiceInput)
    create?: Array<LegacyInvoiceItemCreateWithoutLegacyInvoiceInput>;

    @Field(() => [LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput], {nullable:true})
    @Type(() => LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput)
    connectOrCreate?: Array<LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput>;

    @Field(() => LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope, {nullable:true})
    @Type(() => LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope)
    createMany?: LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope;

    @Field(() => [LegacyInvoiceItemWhereUniqueInput], {nullable:true})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>>;
}
