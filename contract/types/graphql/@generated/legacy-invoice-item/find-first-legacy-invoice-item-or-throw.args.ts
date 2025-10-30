import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceItemWhereInput } from './legacy-invoice-item-where.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceItemOrderByWithRelationInput } from './legacy-invoice-item-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceItemWhereUniqueInput } from './legacy-invoice-item-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceItemScalarFieldEnum } from './legacy-invoice-item-scalar-field.enum';

@ArgsType()
export class FindFirstLegacyInvoiceItemOrThrowArgs {

    @Field(() => LegacyInvoiceItemWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceItemWhereInput)
    where?: LegacyInvoiceItemWhereInput;

    @Field(() => [LegacyInvoiceItemOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LegacyInvoiceItemOrderByWithRelationInput>;

    @Field(() => LegacyInvoiceItemWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LegacyInvoiceItemWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [LegacyInvoiceItemScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof LegacyInvoiceItemScalarFieldEnum>;
}
