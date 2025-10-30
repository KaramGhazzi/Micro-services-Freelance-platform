import {
  Args,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Inject, Injectable } from '@nestjs/common';
import {
  Authorized,
  CurrentCompanyId,
  CurrentUser,
  PrivateSessionInfo,
} from '@package/authorization';
import Stripe from 'stripe';
import { Prisma } from '@freelance/contract/client';
import { StripeSession } from '../../types/session/session.model';
import {
  Checkout,
  FindFirstCheckoutArgs,
} from '../../types/graphql/@generated';
import { CheckoutService } from './checkout.service';
import { PrismaSelectPipe } from '../decorators/prisma-select.decorator';
import { CheckoutCreateOneArgs } from '../../types/graphql/checkout/checkout-create-one.args';

@Resolver(() => Checkout)
@Injectable()
export class CheckoutResolver {
  private defaultSelect: Prisma.CheckoutSelect = {
    sessionId: true,
    planId: true,
    companyId: true,
    userId: true,
    plan: {
      select: {
        product: true,
        usageAmount: true,
      },
    },
  };

  public constructor(
    private readonly checkoutService: CheckoutService,
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe
  ) {}

  @Query(() => Checkout)
  @Authorized({ permissions: ['checkout:get'] })
  async checkout(
    @Args() args: FindFirstCheckoutArgs,
    @CurrentCompanyId() currentCompanyId: number
  ) {
    const { where } = args;
    const token = where.token.equals;
    return this.checkoutService.findByToken(token, currentCompanyId);
  }

  @Authorized({ permissions: ['checkout:create'] })
  @Mutation(() => Checkout)
  async checkoutCreate(
    @Info(PrismaSelectPipe) select: Prisma.CheckoutSelect,
    @Args() args: CheckoutCreateOneArgs,
    @CurrentUser() user: PrivateSessionInfo
  ) {
    return this.checkoutService.create(
      {
        ...args,
        select: {
          ...select,
          ...{
            ...this.defaultSelect,
          },
        },
      },
      user.id
    );
  }

  @ResolveField(() => StripeSession)
  async session(@Parent() checkout: Checkout) {
    return this.stripe.checkout.sessions.retrieve(checkout.sessionId);
  }
}
