import { ObjectType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';

@ObjectType()
export class StripeAddress implements Partial<Stripe.Address> {
  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  line1?: string;

  @Field(() => String, { nullable: true })
  line2?: string;

  @Field(() => String, { nullable: true })
  postal_code?: string;

  @Field(() => String, { nullable: true })
  state?: string;
}
