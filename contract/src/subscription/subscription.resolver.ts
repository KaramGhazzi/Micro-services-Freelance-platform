import { Args, Mutation, Resolver, ResolveReference } from '@nestjs/graphql';
import Stripe from 'stripe';
import { Inject, UseGuards } from '@nestjs/common';
import {
  Authorized,
  CurrentCompanyId,
  CurrentUser,
  PrivateSessionInfo,
} from '@package/authorization';
import { StripeSubscription } from '../../types/graphql/subscription/subscription.model';
import { SubscriptionService } from './subscription.service';
import { SubscriptionUserIsPartOfCompanyGuard } from './guards/user-is-part-of-company.guard';

@Resolver(() => StripeSubscription)
@UseGuards(SubscriptionUserIsPartOfCompanyGuard)
export class SubscriptionResolver {
  constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @Authorized({ permissions: ['subscription:update', 'subscription:cancel'] })
  @Mutation(() => StripeSubscription)
  async cancelSubscription(
    @Args('contractId') contractId: number,
    @CurrentUser() user: PrivateSessionInfo
  ) {
    return this.subscriptionService.cancelSubscription(contractId, user);
  }

  @Authorized({ permissions: ['subscription:update'] })
  @Mutation(() => StripeSubscription)
  async enableSubscription(
    @Args('contractId') contractId: number,
    @CurrentCompanyId() companyId: number
  ) {
    return this.subscriptionService.enableSubscription(contractId, companyId);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.stripe.subscriptions.retrieve(reference.id);
  }
}
