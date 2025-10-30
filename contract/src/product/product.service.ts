import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { ProductRepository } from './product.repository';
import { ProductSlug } from '../../types/graphql/@generated';

@Injectable()
export class ProductService {
  constructor(
    @Inject('STRIPE_SERVICE') private readonly stripe: Stripe,
    private readonly productRepository: ProductRepository
  ) {}

  async seed() {
    let stripeProducts;
    try {
      const { data } = await this.stripe.products.list({ active: true });
      stripeProducts = data;
    } catch (e) {
      throw new Error(`Error communicating with Stripe: ${e}`);
    }

    stripeProducts = stripeProducts.filter(
      (product) =>
        product.metadata.slug !== undefined &&
        Object.values(ProductSlug).includes(product.metadata.slug.toUpperCase())
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const stripeProduct of stripeProducts) {
      // eslint-disable-next-line no-await-in-loop
      await this.productRepository.update({
        where: {
          slug: stripeProduct.metadata.slug.toUpperCase(),
          externalProviderSync: true,
        },
        data: { externalProviderId: stripeProduct.id },
      });
    }
  }
}
