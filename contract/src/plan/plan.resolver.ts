import {
  Args,
  Info,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Authorized } from '@package/authorization';
import { Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { Prisma } from '@freelance/contract/client';
import { PlanRepository } from './plan.repository';
import { PrismaSelectPipe } from '../decorators/prisma-select.decorator';
import { FindManyPlanArgs, Plan } from '../../types/graphql/@generated';
import { StripePrice } from '../../types/graphql/price/price.model';

@Resolver(() => Plan)
export class PlanResolver {
  private defaultSelect: Prisma.PlanSelect = {
    id: true,
    externalProviderId: true,
  };

  constructor(
    @Inject('STRIPE_SERVICE') private readonly stripe: Stripe,
    private readonly planRepository: PlanRepository
  ) {}

  @Authorized({ permissions: ['plan:get-collection'] })
  @Query(() => [Plan])
  async plans(
    @Info(PrismaSelectPipe) select: Prisma.PlanSelect,
    @Args() args: FindManyPlanArgs
  ) {
    return this.planRepository.findMany({
      ...args,
      select: {
        ...select,
        ...this.defaultSelect,
      },
    });
  }

  @ResolveField(() => StripePrice, { nullable: true })
  async price(@Parent() plan: Plan) {
    return (
      plan?.externalProviderId &&
      this.stripe.prices.retrieve(plan.externalProviderId)
    );
  }
}
