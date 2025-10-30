import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyUpdateInput } from './external-provider-company-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@freelance/contract/client';
import { ExternalProviderCompanyWhereUniqueInput } from './external-provider-company-where-unique.input';

@ArgsType()
export class UpdateOneExternalProviderCompanyArgs {

    @Field(() => ExternalProviderCompanyUpdateInput, {nullable:false})
    @Type(() => ExternalProviderCompanyUpdateInput)
    data!: ExternalProviderCompanyUpdateInput;

    @Field(() => ExternalProviderCompanyWhereUniqueInput, {nullable:false})
    @Type(() => ExternalProviderCompanyWhereUniqueInput)
    where!: Prisma.AtLeast<ExternalProviderCompanyWhereUniqueInput, 'companyId' | 'externalProviderId'>;
}
