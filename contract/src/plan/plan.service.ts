import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(
    @Inject('STRIPE_SERVICE') private readonly stripe: Stripe,
    private readonly planRepository: PlanRepository
  ) {}

  async seed() {
    let { data } = await this.stripe.prices.list({
      active: true,
      limit: 100,
    });

    // We are already getting a lot of prices that are not relatable to a product.
    // For now, skip them.
    data = data.filter((product) => product.metadata.slug !== undefined);
    // eslint-disable-next-line no-restricted-syntax
    for (const price of data) {
      // eslint-disable-next-line no-await-in-loop
      await this.planRepository.updateMany({
        where: { slug: price.metadata.slug, externalProviderSync: true },
        data: { externalProviderId: price.id },
      });
    }
  }
}
