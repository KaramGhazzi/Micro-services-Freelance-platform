import { registerEnumType } from '@nestjs/graphql';

export enum LegacyInvoiceItemCode {
    CONTRACT = "CONTRACT",
    CREDIT = "CREDIT",
    DISCOUNT = "DISCOUNT"
}


registerEnumType(LegacyInvoiceItemCode, { name: 'LegacyInvoiceItemCode', description: undefined })
