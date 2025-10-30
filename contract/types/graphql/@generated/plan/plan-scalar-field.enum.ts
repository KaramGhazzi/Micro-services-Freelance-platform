import { registerEnumType } from '@nestjs/graphql';

export enum PlanScalarFieldEnum {
    id = "id",
    externalProviderId = "externalProviderId",
    externalProviderSync = "externalProviderSync",
    externalProviderPaymentMethodId = "externalProviderPaymentMethodId",
    slug = "slug",
    productId = "productId",
    usageType = "usageType",
    usageAmount = "usageAmount",
    usageInterval = "usageInterval",
    usageIntervalCount = "usageIntervalCount",
    renewalInterval = "renewalInterval"
}


registerEnumType(PlanScalarFieldEnum, { name: 'PlanScalarFieldEnum', description: undefined })
