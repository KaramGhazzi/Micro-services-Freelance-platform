import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeSubscriptionCreateItemPriceDataInputRecurring } from './subscription-create-item-price-data-recurring.input';

@InputType()
export class StripeSubscriptionCreateItemPriceDataInput
  implements Stripe.SubscriptionCreateParams.Item.PriceData
{
  @Field(() => String, { nullable: false })
  currency: string;

  @Field(() => String, { nullable: false })
  product: string;

  @Field(() => StripeSubscriptionCreateItemPriceDataInputRecurring, {
    nullable: false,
  })
  recurring: Stripe.SubscriptionCreateParams.Item.PriceData.Recurring;

  @Field(() => String, { nullable: true })
  tax_behavior?: Stripe.SubscriptionCreateParams.Item.PriceData.TaxBehavior;

  @Field(() => Number, { nullable: true })
  unit_amount?: number;

  @Field(() => String, { nullable: true })
  unit_amount_decimal?: string;
}
