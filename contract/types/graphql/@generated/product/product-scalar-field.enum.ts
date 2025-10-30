import { registerEnumType } from '@nestjs/graphql';

export enum ProductScalarFieldEnum {
    id = "id",
    externalProviderId = "externalProviderId",
    externalProviderSync = "externalProviderSync",
    name = "name",
    slug = "slug",
    description = "description",
    modeType = "modeType"
}


registerEnumType(ProductScalarFieldEnum, { name: 'ProductScalarFieldEnum', description: undefined })
