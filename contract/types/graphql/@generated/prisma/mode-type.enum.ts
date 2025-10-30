import { registerEnumType } from '@nestjs/graphql';

export enum ModeType {
    PAYMENT = "PAYMENT",
    SETUP = "SETUP",
    SUBSCRIPTION = "SUBSCRIPTION"
}


registerEnumType(ModeType, { name: 'ModeType', description: undefined })
