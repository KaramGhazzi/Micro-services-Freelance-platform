import { ObjectType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripeProductMetadata } from './product-metadata.model';
import { StripePrice } from '../price/price.model';
import { ModeType } from '../@generated';

@ObjectType()
export class StripeProduct implements Partial<Stripe.Product> {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  object: 'product';

  @Field(() => Boolean, { nullable: false })
  active: boolean;

  @Field(() => Number, { nullable: false })
  created: number;

  @Field(() => String, { nullable: true })
  default_price?: string | Stripe.Price | null;

  @Field(() => Boolean, { nullable: true })
  deleted?: void;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Boolean, { nullable: false })
  livemode: boolean;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => StripeProductMetadata, { nullable: false })
  metadata: Stripe.Metadata;

  @Field(() => String, { nullable: false })
  type: Stripe.Product.Type;

  @Field(() => String, { nullable: false })
  modeType: ModeType;

  @Field(() => String, { nullable: true })
  unit_label?: string | null;

  @Field(() => Number, { nullable: false })
  updated: number;

  @Field(() => [StripePrice], { nullable: true })
  prices?: Array<Stripe.Price> | null;

  /**
   * TODO: The fields below are not yet implemented. If needed, implement them.
   */

  /**
   * A list of up to 15 features for this product. These are displayed in [pricing tables](https://stripe.com/docs/payments/checkout/pricing-table).
   */
  features: Array<Stripe.Product.Feature>;

  /**
   * A list of up to 8 URLs of images for this product, meant to be displayable to the customer.
   */
  images: Array<string>;

  /**
   * A URL of a publicly-accessible webpage for this product.
   */
  url: string | null;

  /**
   * The dimensions of this product for shipping purposes.
   */
  package_dimensions: Stripe.Product.PackageDimensions | null;

  /**
   * Whether this product is shipped (i.e., physical goods).
   */
  shippable: boolean | null;

  /**
   * Extra information about a product which will appear on your customer's credit card statement. In the case that multiple products are billed at once, the first statement descriptor will be used.
   */
  statement_descriptor?: string | null;

  /**
   * A [tax code](https://stripe.com/docs/tax/tax-categories) ID.
   */
  tax_code: string | Stripe.TaxCode | null;
}
