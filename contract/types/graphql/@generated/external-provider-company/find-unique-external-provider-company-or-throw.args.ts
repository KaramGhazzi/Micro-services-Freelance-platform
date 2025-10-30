import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ExternalProviderCompanyWhereUniqueInput } from './external-provider-company-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueExternalProviderCompanyOrThrowArgs {

    @Field(() => ExternalProviderCompanyWhereUniqueInput, {nullable:false})
    @Type(() => ExternalProviderCompanyWhereUniqueInput)
    where!: Prisma.AtLeast<ExternalProviderCompanyWhereUniqueInput, 'companyId' | 'externalProviderId'>;
}
