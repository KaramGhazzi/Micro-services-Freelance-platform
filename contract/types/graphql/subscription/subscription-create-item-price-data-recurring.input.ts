import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class StripeSubscriptionCreateItemPriceDataInputRecurring
  implements Stripe.SubscriptionCreateParams.Item.PriceData.Recurring
{
  @Field(() => String, { nullable: false })
  interval: Stripe.SubscriptionCreateParams.Item.PriceData.Recurring.Interval;

  @Field(() => Number, { nullable: true })
  interval_count?: number;
}
