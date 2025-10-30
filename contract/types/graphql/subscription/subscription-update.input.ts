import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class StripeSubscriptionUpdateInput
  implements Stripe.SubscriptionUpdateParams
{
  @Field(() => Boolean, { nullable: true })
  cancel_at_period_end?: boolean;
}
