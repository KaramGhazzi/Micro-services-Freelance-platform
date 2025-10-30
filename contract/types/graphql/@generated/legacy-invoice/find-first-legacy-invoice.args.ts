import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LegacyInvoiceWhereInput } from './legacy-invoice-where.input';
import { Type } from 'class-transformer';
import { LegacyInvoiceOrderByWithRelationInput } from './legacy-invoice-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { LegacyInvoiceWhereUniqueInput } from './legacy-invoice-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LegacyInvoiceScalarFieldEnum } from './legacy-invoice-scalar-field.enum';

@ArgsType()
export class FindFirstLegacyInvoiceArgs {

    @Field(() => LegacyInvoiceWhereInput, {nullable:true})
    @Type(() => LegacyInvoiceWhereInput)
    where?: LegacyInvoiceWhereInput;

    @Field(() => [LegacyInvoiceOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LegacyInvoiceOrderByWithRelationInput>;

    @Field(() => LegacyInvoiceWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LegacyInvoiceWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [LegacyInvoiceScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof LegacyInvoiceScalarFieldEnum>;
}
