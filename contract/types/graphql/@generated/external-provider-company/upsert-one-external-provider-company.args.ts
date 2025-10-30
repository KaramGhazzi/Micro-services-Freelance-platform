import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ExternalProviderCompanyWhereUniqueInput } from './external-provider-company-where-unique.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyCreateInput } from './external-provider-company-create.input';
import { ExternalProviderCompanyUpdateInput } from './external-provider-company-update.input';

@ArgsType()
export class UpsertOneExternalProviderCompanyArgs {

    @Field(() => ExternalProviderCompanyWhereUniqueInput, {nullable:false})
    @Type(() => ExternalProviderCompanyWhereUniqueInput)
    where!: Prisma.AtLeast<ExternalProviderCompanyWhereUniqueInput, 'companyId' | 'externalProviderId'>;

    @Field(() => ExternalProviderCompanyCreateInput, {nullable:false})
    @Type(() => ExternalProviderCompanyCreateInput)
    create!: ExternalProviderCompanyCreateInput;

    @Field(() => ExternalProviderCompanyUpdateInput, {nullable:false})
    @Type(() => ExternalProviderCompanyUpdateInput)
    update!: ExternalProviderCompanyUpdateInput;
}
