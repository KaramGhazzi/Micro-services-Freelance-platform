import { ObjectType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';

@ObjectType()
export class StripePaymentMethod implements Partial<Stripe.PaymentMethod> {
  @Field(() => String, { nullable: false })
  id: string;
}
