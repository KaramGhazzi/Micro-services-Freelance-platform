import { ObjectType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripePrice } from '../price/price.model';

@ObjectType()
export class StripeSubscriptionItem
  implements Partial<Stripe.SubscriptionItem>
{
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  object: 'subscription_item';

  @Field(() => Number, { nullable: false })
  created: number;

  @Field(() => Boolean, { nullable: true })
  deleted?: void;

  @Field(() => Number, { nullable: true })
  quantity?: number;

  @Field(() => String, { nullable: false })
  subscription: string;

  @Field(() => StripePrice, { nullable: false })
  price: Stripe.Price;

  /**
   * TODO: The fields below are not yet implemented. If needed, implement them.
   */

  /**
   * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: Stripe.Metadata;

  /**
   * Define thresholds at which an invoice will be sent, and the related subscription advanced to a new billing period
   */
  billing_thresholds: Stripe.SubscriptionItem.BillingThresholds | null;

  /**
   * You can now model subscriptions more flexibly using the [Prices API](https://stripe.com/docs/api#prices). It replaces the Plans API and is backwards compatible to simplify your migration.
   *
   * Plans define the base price, currency, and billing cycle for recurring purchases of products.
   * [Products](https://stripe.com/docs/api#products) help you track inventory or provisioning, and plans help you track pricing. Different physical goods or levels of service should be represented by products, and pricing options should be represented by plans. This approach lets you change prices without having to change your provisioning scheme.
   *
   * For example, you might have a single "gold" product that has plans for $10/month, $100/year, €9/month, and €90/year.
   *
   * Related guides: [Set up a subscription](https://stripe.com/docs/billing/subscriptions/set-up-subscription) and more about [products and prices](https://stripe.com/docs/products-prices/overview).
   */
  plan: Stripe.Plan;

  /**
   * The tax rates which apply to this `subscription_item`. When set, the `default_tax_rates` on the subscription do not apply to this `subscription_item`.
   */
  tax_rates: Array<Stripe.TaxRate> | null;
}
