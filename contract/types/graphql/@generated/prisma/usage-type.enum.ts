import { registerEnumType } from '@nestjs/graphql';

export enum UsageType {
    ASSIGNMENT = "ASSIGNMENT",
    ASSIGNMENT_VIEW = "ASSIGNMENT_VIEW",
    ASSIGNMENT_APPLICATION = "ASSIGNMENT_APPLICATION",
    COMPANY_PREMIUM_PROFILE = "COMPANY_PREMIUM_PROFILE",
    TOP_BOX = "TOP_BOX"
}


registerEnumType(UsageType, { name: 'UsageType', description: undefined })
