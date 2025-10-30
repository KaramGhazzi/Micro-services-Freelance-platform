import { InputType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeSubscriptionCreateItemInput } from './subscription-create-item.input';
import { StripeSubscriptionMetadataInput } from './subscription-metadata.input';

@InputType()
export class StripeSubscriptionCreateInput
  implements Stripe.SubscriptionCreateParams
{
  @Field(() => String, { nullable: false })
  customer: string;

  @Field(() => Number, { nullable: true })
  backdate_start_date?: number;

  @Field(() => Number, { nullable: true })
  billing_cycle_anchor?: number;

  @Field(() => Number, { nullable: true })
  cancel_at?: number;

  @Field(() => Boolean, { nullable: true })
  cancel_at_period_end?: boolean;

  @Field(() => String, { nullable: true })
  collection_method?: Stripe.SubscriptionCreateParams.CollectionMethod;

  @Field(() => String, { nullable: true })
  coupon?: string;

  @Field(() => String, { nullable: true })
  currency?: string;

  @Field(() => Number, { nullable: true })
  days_until_due?: number;

  @Field(() => String, { nullable: true })
  default_payment_method?: string;

  @Field(() => String, { nullable: true })
  default_source?: string;

  @Field(() => [String], { nullable: true })
  default_tax_rates?: Stripe.Emptyable<Array<string>>;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  expand?: Array<string>;

  @Field(() => [StripeSubscriptionCreateItemInput], { nullable: true })
  items?: Array<Stripe.SubscriptionCreateParams.Item>;

  @Field(() => StripeSubscriptionMetadataInput, { nullable: true })
  metadata?: Stripe.Emptyable<Stripe.MetadataParam>;

  @Field(() => Boolean, { nullable: true })
  off_session?: boolean;

  /**
   * TODO: The fields below are not yet implemented. If needed, implement them.
   */

  /**
   * TODO: This is probably needed for when you want to buy more credits
   * A list of prices and quantities that will generate invoice items appended to the next invoice for this subscription. You may pass up to 20 items.
   */
  add_invoice_items?: Array<Stripe.SubscriptionCreateParams.AddInvoiceItem>;

  /**
   * A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. The request must be made by a platform account on a connected account in order to set an application fee percentage. For more information, see the application fees [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).
   */
  application_fee_percent?: number;

  /**
   * Automatic tax settings for this subscription. We recommend you only include this parameter when the existing value is being changed.
   */
  automatic_tax?: Stripe.SubscriptionCreateParams.AutomaticTax;

  /**
   * Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. Pass an empty string to remove previously-defined thresholds.
   */
  billing_thresholds?: Stripe.Emptyable<Stripe.SubscriptionCreateParams.BillingThresholds>;

  /**
   * The account on behalf of which to charge, for each of the subscription's invoices.
   */
  on_behalf_of?: Stripe.Emptyable<string>;

  /**
   * Only applies to subscriptions with `collection_method=charge_automatically`.
   *
   * Use `allow_incomplete` to create subscriptions with `status=incomplete` if the first invoice cannot be paid. Creating subscriptions with this status allows you to manage scenarios where additional user actions are needed to pay a subscription's invoice. For example, SCA regulation may require 3DS authentication to complete payment. See the [SCA Migration Guide](https://stripe.com/docs/billing/migration/strong-customer-authentication) for Billing to learn more. This is the default behavior.
   *
   * Use `default_incomplete` to create Subscriptions with `status=incomplete` when the first invoice requires payment, otherwise start as active. Subscriptions transition to `status=active` when successfully confirming the payment intent on the first invoice. This allows simpler management of scenarios where additional user actions are needed to pay a subscription's invoice. Such as failed payments, [SCA regulation](https://stripe.com/docs/billing/migration/strong-customer-authentication), or collecting a mandate for a bank debit payment method. If the payment intent is not confirmed within 23 hours subscriptions transition to `status=incomplete_expired`, which is a terminal state.
   *
   * Use `error_if_incomplete` if you want Stripe to return an HTTP 402 status code if a subscription's first invoice cannot be paid. For example, if a payment method requires 3DS authentication due to SCA regulation and further user action is needed, this parameter does not create a subscription and returns an error instead. This was the default behavior for API versions prior to 2019-03-14. See the [changelog](https://stripe.com/docs/upgrades#2019-03-14) to learn more.
   *
   * `pending_if_incomplete` is only used with updates and cannot be passed when creating a subscription.
   *
   * Subscriptions with `collection_method=send_invoice` are automatically activated regardless of the first invoice status.
   */
  payment_behavior?: Stripe.SubscriptionCreateParams.PaymentBehavior;

  /**
   * Payment settings to pass to invoices created by the subscription.
   */
  payment_settings?: Stripe.SubscriptionCreateParams.PaymentSettings;

  /**
   * Specifies an interval for how often to bill for any pending invoice items. It is analogous to calling [Create an invoice](https://stripe.com/docs/api#create_invoice) for the given subscription at the specified interval.
   */
  pending_invoice_item_interval?: Stripe.Emptyable<Stripe.SubscriptionCreateParams.PendingInvoiceItemInterval>;

  /**
   * The API ID of a promotion code to apply to this subscription. A promotion code applied to a subscription will only affect invoices created for that particular subscription.
   */
  promotion_code?: string;

  /**
   * Determines how to handle [prorations](https://stripe.com/docs/subscriptions/billing-cycle#prorations) resulting from the `billing_cycle_anchor`. If no value is passed, the default is `create_prorations`.
   */
  proration_behavior?: Stripe.SubscriptionCreateParams.ProrationBehavior;

  /**
   * If specified, the funds from the subscription's invoices will be transferred to the destination and the ID of the resulting transfers will be found on the resulting charges.
   */
  transfer_data?: Stripe.SubscriptionCreateParams.TransferData;

  /**
   * Unix timestamp representing the end of the trial period the customer will get before being charged for the first time. If set, trial_end will override the default trial period of the plan the customer is being subscribed to. The special value `now` can be provided to end the customer's trial immediately. Can be at most two years from `billing_cycle_anchor`. See [Using trial periods on subscriptions](https://stripe.com/docs/billing/subscriptions/trials) to learn more.
   */
  trial_end?: 'now' | number;

  /**
   * Indicates if a plan's `trial_period_days` should be applied to the subscription. Setting `trial_end` per subscription is preferred, and this defaults to `false`. Setting this flag to `true` together with `trial_end` is not allowed. See [Using trial periods on subscriptions](https://stripe.com/docs/billing/subscriptions/trials) to learn more.
   */
  trial_from_plan?: boolean;

  /**
   * Integer representing the number of trial period days before the customer is charged for the first time. This will always overwrite any trials that might apply via a subscribed plan. See [Using trial periods on subscriptions](https://stripe.com/docs/billing/subscriptions/trials) to learn more.
   */
  trial_period_days?: number;

  /**
   * Settings related to subscription trials.
   */
  trial_settings?: Stripe.SubscriptionCreateParams.TrialSettings;
}
