import { Resolver, Query } from '@nestjs/graphql';
import Stripe from 'stripe';
import { Inject } from '@nestjs/common';
import { Authorized } from '@package/authorization';
import { StripeProduct } from '../../types/graphql/product/product.model';

@Resolver(() => StripeProduct)
export class ProductResolver {
  constructor(@Inject('STRIPE_SERVICE') private readonly stripe: Stripe) {}

  @Authorized()
  @Query(() => [StripeProduct], { nullable: false })
  async products() {
    const { data } = await this.stripe.products.list({ active: true });

    const platformProducts = data
      .filter((product) => product?.metadata?.source === 'platform')
      .sort(
        (a, b) =>
          parseInt(a?.metadata?.order, 10) - parseInt(b?.metadata?.order, 10)
      );

    return Promise.all(
      platformProducts.map(async (product) => {
        const prices = await this.stripe.prices.list({
          product: product.id,
          active: true,
        });

        return {
          ...product,
          prices: prices?.data,
        };
      })
    );
  }
}
