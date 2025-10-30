import { registerEnumType } from '@nestjs/graphql';

export enum RenewalInterval {
    QUARTER = "QUARTER",
    YEAR = "YEAR",
    MONTH = "MONTH",
    HALF_YEAR = "HALF_YEAR"
}


registerEnumType(RenewalInterval, { name: 'RenewalInterval', description: undefined })
