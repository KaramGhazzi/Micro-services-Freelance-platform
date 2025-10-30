import { registerEnumType } from '@nestjs/graphql';

export enum LegacyInvoiceStatus {
    NEW = "NEW",
    REMOVED = "REMOVED",
    PAID = "PAID",
    CREDITED = "CREDITED",
    EXPIRED = "EXPIRED",
    OPEN = "OPEN",
    COLLECTION = "COLLECTION",
    COLLECTIONSENT = "COLLECTIONSENT",
    INTERNAL_PENDING = "INTERNAL_PENDING",
    PENDING = "PENDING",
    CREDIT = "CREDIT",
    CREDIT_PENDING = "CREDIT_PENDING",
    CREDIT_FAIL = "CREDIT_FAIL"
}


registerEnumType(LegacyInvoiceStatus, { name: 'LegacyInvoiceStatus', description: undefined })
