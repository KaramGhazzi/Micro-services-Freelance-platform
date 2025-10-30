import { registerEnumType } from '@nestjs/graphql';

export enum UsageScalarFieldEnum {
    id = "id",
    type = "type",
    amount = "amount",
    companyId = "companyId",
    created = "created",
    objectId = "objectId"
}


registerEnumType(UsageScalarFieldEnum, { name: 'UsageScalarFieldEnum', description: undefined })
