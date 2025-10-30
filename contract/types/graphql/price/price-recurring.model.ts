import { ObjectType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';

@ObjectType()
export class StripePriceRecurring implements Partial<Stripe.Price.Recurring> {
  @Field(() => String, { nullable: true })
  aggregate_usage?: Stripe.Price.Recurring.AggregateUsage | null;

  @Field(() => String, { nullable: false })
  interval: Stripe.Price.Recurring.Interval;

  @Field(() => Number, { nullable: false })
  interval_count: number;

  @Field(() => Number, { nullable: true })
  trial_period_days?: number | null;

  @Field(() => String, { nullable: false })
  usage_type: Stripe.Price.Recurring.UsageType;
}
