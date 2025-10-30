import { registerEnumType } from '@nestjs/graphql';

export enum LegacyInvoiceItemScalarFieldEnum {
    id = "id",
    legacyInvoiceId = "legacyInvoiceId",
    contractId = "contractId",
    invoiceItemCode = "invoiceItemCode",
    description = "description",
    startDate = "startDate",
    endDate = "endDate",
    amount = "amount",
    price = "price",
    taxPercent = "taxPercent"
}


registerEnumType(LegacyInvoiceItemScalarFieldEnum, { name: 'LegacyInvoiceItemScalarFieldEnum', description: undefined })
