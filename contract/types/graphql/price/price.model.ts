import { ObjectType, Field } from '@nestjs/graphql';
import Stripe from 'stripe';
import { StripePriceRecurring } from './price-recurring.model';

@ObjectType()
export class StripePrice implements Partial<Stripe.Price> {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  object: 'price';

  @Field(() => String, { nullable: true })
  nickname?: string | null;

  @Field(() => Boolean, { nullable: false })
  active: boolean;

  @Field(() => Number, { nullable: false })
  created: number;

  @Field(() => String, { nullable: false })
  currency: string;

  @Field(() => Boolean, { nullable: true })
  deleted?: void;

  @Field(() => Boolean, { nullable: false })
  livemode: boolean;

  @Field(() => String, { nullable: true })
  lookup_key?: string | null;

  @Field(() => String, { nullable: false })
  product: string | Stripe.Product | Stripe.DeletedProduct;

  @Field(() => String, { nullable: false })
  type: Stripe.Price.Type;

  @Field(() => Number, { nullable: true })
  unit_amount?: number | null;

  @Field(() => String, { nullable: true })
  unit_amount_decimal?: string | null;

  @Field(() => String, { nullable: true })
  tax_behavior?: Stripe.Price.TaxBehavior | null;

  @Field(() => StripePriceRecurring, { nullable: true })
  recurring: Stripe.Price.Recurring | null;

  /**
   * TODO: The fields below are not yet implemented. If needed, implement them.
   */

  /**
   * Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.
   */
  billing_scheme: Stripe.Price.BillingScheme;

  /**
   * Prices defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).
   */
  currency_options?: {
    [key: string]: Stripe.Price.CurrencyOptions;
  };

  /**
   * When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.
   */
  custom_unit_amount: Stripe.Price.CustomUnitAmount | null;

  /**
   * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: Stripe.Metadata;

  /**
   * Only required if a [default tax behavior](https://stripe.com/docs/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.
   */

  /**
   * Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.
   */
  tiers?: Array<Stripe.Price.Tier>;

  /**
   * Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price. In `graduated` tiering, pricing can change as the quantity grows.
   */
  tiers_mode: Stripe.Price.TiersMode | null;

  /**
   * Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with `tiers`.
   */
  transform_quantity: Stripe.Price.TransformQuantity | null;
}
