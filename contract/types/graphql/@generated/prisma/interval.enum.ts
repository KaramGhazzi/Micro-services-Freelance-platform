import { registerEnumType } from '@nestjs/graphql';

export enum Interval {
    WEEK = "WEEK",
    MONTH = "MONTH",
    QUARTER = "QUARTER",
    HALF_YEAR = "HALF_YEAR",
    YEAR = "YEAR",
    NONE = "NONE"
}


registerEnumType(Interval, { name: 'Interval', description: undefined })
