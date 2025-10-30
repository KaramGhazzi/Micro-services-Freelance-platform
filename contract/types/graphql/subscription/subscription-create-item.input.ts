import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeSubscriptionCreateItemPriceDataInput } from './subscription-create-item-price-data.input';

@InputType()
export class StripeSubscriptionCreateItemInput
  implements Stripe.SubscriptionCreateParams.Item
{
  @Field(() => String, { nullable: true })
  plan?: string;

  @Field(() => String, { nullable: true })
  price?: string;

  @Field(() => StripeSubscriptionCreateItemPriceDataInput, { nullable: true })
  price_data?: Stripe.SubscriptionCreateParams.Item.PriceData;

  @Field(() => Number, { nullable: true })
  quantity?: number;

  @Field(() => [String], { nullable: true })
  tax_rates?: Stripe.Emptyable<Array<string>>;
}
