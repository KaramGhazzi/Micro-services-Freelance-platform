import { registerEnumType } from '@nestjs/graphql';

export enum CheckoutScalarFieldEnum {
    id = "id",
    planId = "planId",
    companyId = "companyId",
    userId = "userId",
    token = "token",
    sessionId = "sessionId"
}


registerEnumType(CheckoutScalarFieldEnum, { name: 'CheckoutScalarFieldEnum', description: undefined })
