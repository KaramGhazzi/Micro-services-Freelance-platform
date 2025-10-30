import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class StripeSubscriptionCancelInput
  implements Stripe.SubscriptionCancelParams
{
  @Field(() => Boolean, { nullable: true })
  invoice_now?: boolean;
}
