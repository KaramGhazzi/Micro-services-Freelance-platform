import { Field, InputType, Int } from '@nestjs/graphql';
import { Interval } from '../@generated/prisma/interval.enum';

@InputType()
export class CustomContractCreateInput {
  @Field(() => Int, { nullable: false })
  planId!: number;

  @Field(() => Int, { nullable: false })
  companyId!: number;

  @Field(() => Int, { nullable: true })
  usageAmount?: number;

  @Field(() => String, { nullable: true })
  usageInterval?: keyof typeof Interval;

  @Field(() => String, { nullable: true })
  startDate?: Date;

  @Field(() => String, { nullable: true })
  endDate?: Date;

  @Field(() => String, { nullable: true })
  renewalInterval?: string;
}
