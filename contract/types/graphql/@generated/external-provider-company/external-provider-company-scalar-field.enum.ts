import { registerEnumType } from '@nestjs/graphql';

export enum ExternalProviderCompanyScalarFieldEnum {
    companyId = "companyId",
    externalProviderId = "externalProviderId"
}


registerEnumType(ExternalProviderCompanyScalarFieldEnum, { name: 'ExternalProviderCompanyScalarFieldEnum', description: undefined })
