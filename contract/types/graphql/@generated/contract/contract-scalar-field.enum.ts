import { registerEnumType } from '@nestjs/graphql';

export enum ContractScalarFieldEnum {
    id = "id",
    companyId = "companyId",
    externalProviderId = "externalProviderId",
    invoiceId = "invoiceId",
    planId = "planId",
    startDate = "startDate",
    endDate = "endDate",
    usageType = "usageType",
    usageAmount = "usageAmount",
    usageInterval = "usageInterval",
    usageIntervalCount = "usageIntervalCount",
    subscriptionExpireDate = "subscriptionExpireDate",
    renewalInterval = "renewalInterval"
}


registerEnumType(ContractScalarFieldEnum, { name: 'ContractScalarFieldEnum', description: undefined })
