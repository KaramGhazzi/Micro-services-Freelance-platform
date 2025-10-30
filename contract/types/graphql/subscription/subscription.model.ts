import { ObjectType, Field, Directive } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeSubscriptionMetadata } from './subscription-metadata.model';
import { StripeSubscriptionItemList } from './subscription-item-list.model';

@Directive('@key(fields: "id")')
@ObjectType()
export class StripeSubscription implements Partial<Stripe.Subscription> {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  object: 'subscription';

  @Field(() => Number, { nullable: true })
  billing_cycle_anchor: number;

  @Field(() => Number, { nullable: true })
  cancel_at?: number | null;

  @Field(() => Boolean, { nullable: true })
  cancel_at_period_end: boolean;

  @Field(() => Number, { nullable: true })
  canceled_at?: number | null;

  @Field(() => String, { nullable: false })
  collection_method: Stripe.Subscription.CollectionMethod;

  @Field(() => Number, { nullable: true })
  created: number;

  @Field(() => String, { nullable: true })
  currency: string;

  @Field(() => Number, { nullable: true })
  current_period_end: number;

  @Field(() => Number, { nullable: true })
  current_period_start: number;

  @Field(() => String, { nullable: true })
  customer: string | Stripe.Customer | Stripe.DeletedCustomer;

  @Field(() => Number, { nullable: true })
  days_until_due?: number | null;

  @Field(() => String, { nullable: true })
  default_payment_method?: string | Stripe.PaymentMethod | null;

  @Field(() => String, { nullable: true })
  default_source?: string | Stripe.CustomerSource | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Number, { nullable: true })
  ended_at?: number | null;

  @Field(() => StripeSubscriptionItemList, { nullable: true })
  items: Stripe.ApiList<Stripe.SubscriptionItem>;

  @Field(() => String, { nullable: true })
  latest_invoice?: string | Stripe.Invoice | null;

  @Field(() => StripeSubscriptionMetadata, { nullable: true })
  metadata?: Stripe.Metadata;

  @Field(() => Number, { nullable: true })
  start_date: number;

  @Field(() => String, { nullable: true })
  status: Stripe.Subscription.Status;
}
