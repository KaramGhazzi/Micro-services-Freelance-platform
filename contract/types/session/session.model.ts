// eslint-disable-next-line max-classes-per-file
import { ObjectType, Field, Directive } from '@nestjs/graphql';
import Stripe from 'stripe';

@ObjectType()
class TotalDetails implements Partial<Stripe.Checkout.Session.TotalDetails> {
  @Field(() => Number, { nullable: true })
  amount_tax?: number;
}

@Directive('@key(fields: "id")')
@ObjectType()
export class StripeSession implements Partial<Stripe.Checkout.Session> {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => Number, { nullable: true })
  amount_subtotal: number | null;

  @Field(() => Number, { nullable: true })
  amount_total: number | null;

  @Field(() => String, { nullable: true })
  cancel_url: string | null;

  @Field(() => String, { nullable: true })
  client_reference_id: string | null;

  //   @Field(() => ObjectType, { nullable: true })
  //   consent: Session.Consent | null;

  //   @Field(() => ObjectType, { nullable: true })
  //   consent_collection: Session.ConsentCollection | null;

  @Field(() => Number, { nullable: false })
  created: number;

  @Field(() => String, { nullable: true })
  currency: string | null;

  @Field(() => Number, { nullable: false })
  expires_at: number;

  @Field(() => Boolean, { nullable: false })
  livemode: boolean;

  @Field(() => String, { nullable: false })
  mode: Stripe.Checkout.Session.Mode;

  @Field(() => String, { nullable: true })
  payment_intent: string | Stripe.PaymentIntent | null;

  @Field(() => String, { nullable: true })
  payment_link: string | Stripe.PaymentLink | null;

  @Field(() => String, { nullable: true })
  payment_method_collection: Stripe.Checkout.Session.PaymentMethodCollection | null;

  @Field(() => String, { nullable: true })
  payment_method_configuration_details?: Stripe.Checkout.Session.PaymentMethodConfigurationDetails | null;

  @Field(() => String, { nullable: true })
  payment_method_options: Stripe.Checkout.Session.PaymentMethodOptions | null;

  @Field(() => [String], { nullable: false })
  payment_method_types: Array<string>;

  @Field(() => String, { nullable: false })
  payment_status: Stripe.Checkout.Session.PaymentStatus;

  @Field(() => String, { nullable: true })
  status: Stripe.Checkout.Session.Status | null;

  @Field(() => String, { nullable: true })
  submit_type: Stripe.Checkout.Session.SubmitType | null;

  @Field(() => String, { nullable: true })
  subscription: string | Stripe.Subscription | null;

  @Field(() => String, { nullable: true })
  success_url: string | null;

  @Field(() => String, { nullable: true })
  url: string | null;

  @Field(() => TotalDetails, { nullable: true })
  total_details?: Stripe.Checkout.Session.TotalDetails;

  @Field(() => String, { nullable: true })
  invoice?: string | Stripe.Invoice;
}
