import { registerEnumType } from '@nestjs/graphql';

export enum LegacyInvoiceScalarFieldEnum {
    id = "id",
    companyId = "companyId",
    createdAt = "createdAt",
    description = "description",
    firstName = "firstName",
    lastName = "lastName",
    addressLine1 = "addressLine1",
    addressLine2 = "addressLine2",
    postalCode = "postalCode",
    city = "city",
    status = "status"
}


registerEnumType(LegacyInvoiceScalarFieldEnum, { name: 'LegacyInvoiceScalarFieldEnum', description: undefined })
