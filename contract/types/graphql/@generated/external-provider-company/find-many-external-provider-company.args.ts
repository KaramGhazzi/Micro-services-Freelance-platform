import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyOrderByWithRelationInput } from './external-provider-company-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { ExternalProviderCompanyWhereUniqueInput } from './external-provider-company-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ExternalProviderCompanyScalarFieldEnum } from './external-provider-company-scalar-field.enum';

@ArgsType()
export class FindManyExternalProviderCompanyArgs {

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereInput)
    where?: ExternalProviderCompanyWhereInput;

    @Field(() => [ExternalProviderCompanyOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ExternalProviderCompanyOrderByWithRelationInput>;

    @Field(() => ExternalProviderCompanyWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ExternalProviderCompanyWhereUniqueInput, 'companyId' | 'externalProviderId'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ExternalProviderCompanyScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ExternalProviderCompanyScalarFieldEnum>;
}
