import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LegacyInvoiceItemCreateWithoutLegacyInvoiceInput } from './legacy-invoice-item-create-without-legacy-invoice.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput } from './legacy-invoice-item-create-or-connect-without-legacy-invoice.input';
import { LegacyInvoiceItemUpsertWithWhereUniqueWithoutLegacyInvoiceInput } from './legacy-invoice-item-upsert-with-where-unique-without-legacy-invoice.input';
import { LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope } from './legacy-invoice-item-create-many-legacy-invoice-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { LegacyInvoiceItemUpdateWithWhereUniqueWithoutLegacyInvoiceInput } from './legacy-invoice-item-update-with-where-unique-without-legacy-invoice.input';
import { LegacyInvoiceItemUpdateManyWithWhereWithoutLegacyInvoiceInput } from './legacy-invoice-item-update-many-with-where-without-legacy-invoice.input';
import { LegacyInvoiceItemScalarWhereInput } from './legacy-invoice-item-scalar-where.input';

@InputType()
export class LegacyInvoiceItemUpdateManyWithoutLegacyInvoiceNestedInput {

    @Field(() => [LegacyInvoiceItemCreateWithoutLegacyInvoiceInput], {nullable:true})
    @Type(() => LegacyInvoiceItemCreateWithoutLegacyInvoiceInput)
    create?: Array<LegacyInvoiceItemCreateWithoutLegacyInvoiceInput>;

    @Field(() => [LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput], {nullable:true})
    @Type(() => LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput)
    connectOrCreate?: Array<LegacyInvoiceItemCreateOrConnectWithoutLegacyInvoiceInput>;

    @Field(() => [LegacyInvoiceItemUpsertWithWhereUniqueWithoutLegacyInvoiceInput], {nullable:true})
    @Type(() => LegacyInvoiceItemUpsertWithWhereUniqueWithoutLegacyInvoiceInput)
    upsert?: Array<LegacyInvoiceItemUpsertWithWhereUniqueWithoutLegacyInvoiceInput>;

    @Field(() => LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope, {nullable:true})
    @Type(() => LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope)
    createMany?: LegacyInvoiceItemCreateManyLegacyInvoiceInputEnvelope;

    @Field(() => [LegacyInvoiceItemWhereUniqueInput], {nullable:true})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>>;

    @Field(() => [LegacyInvoiceItemWhereUniqueInput], {nullable:true})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>>;

    @Field(() => [LegacyInvoiceItemWhereUniqueInput], {nullable:true})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>>;

    @Field(() => [LegacyInvoiceItemWhereUniqueInput], {nullable:true})
    @Type(() => LegacyInvoiceItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>>;

    @Field(() => [LegacyInvoiceItemUpdateWithWhereUniqueWithoutLegacyInvoiceInput], {nullable:true})
    @Type(() => LegacyInvoiceItemUpdateWithWhereUniqueWithoutLegacyInvoiceInput)
    update?: Array<LegacyInvoiceItemUpdateWithWhereUniqueWithoutLegacyInvoiceInput>;

    @Field(() => [LegacyInvoiceItemUpdateManyWithWhereWithoutLegacyInvoiceInput], {nullable:true})
    @Type(() => LegacyInvoiceItemUpdateManyWithWhereWithoutLegacyInvoiceInput)
    updateMany?: Array<LegacyInvoiceItemUpdateManyWithWhereWithoutLegacyInvoiceInput>;

    @Field(() => [LegacyInvoiceItemScalarWhereInput], {nullable:true})
    @Type(() => LegacyInvoiceItemScalarWhereInput)
    deleteMany?: Array<LegacyInvoiceItemScalarWhereInput>;
}
