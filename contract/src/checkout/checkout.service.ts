import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as crypto from 'crypto';
import * as process from 'process';
import { PlanRepository } from '../plan/plan.repository';
import { CheckoutRepository } from './checkout.repository';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';
import { CheckoutCreateArgs } from '../../types/graphql/checkout/checkout-create.args';
import { Checkout, ModeType } from '../../types/graphql/@generated';
import { ExternalProviderCompanyService } from '../external-provider-company/external-provider-company.service';

@Injectable()
export class CheckoutService {
  public constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly planRepository: PlanRepository,
    private readonly checkoutRepository: CheckoutRepository,
    private readonly companyRepository: ExternalProviderCompanyRepository,
    private readonly externalProviderCompanyService: ExternalProviderCompanyService
  ) {}

  async create(args: CheckoutCreateArgs, userId: number): Promise<Checkout> {
    const { planId, companyId } = args.data;

    const plan = await this.planRepository.findUniqueOrThrow({
      where: { id: planId, externalProviderSync: true },
      select: {
        externalProviderId: true,
        externalProviderPaymentMethodId: true,
        product: {
          select: {
            modeType: true,
          },
        },
      },
    });

    try {
      let company = await this.companyRepository.findUnique({
        where: {
          companyId,
        },
      });

      // If the company does not exist, create a new one
      if (!company) {
        company = await this.companyRepository.create({
          data: {
            companyId,
          },
        });
      }

      if (!company) {
        throw new Error(
          `Cannot find company ${companyId} for stripe checkout session`
        );
      }

      // Determine if the company has a customer at the external provider or not
      if (!company?.externalProviderId) {
        // Create a new customer for the company if it does not exist
        const customer =
          await this.externalProviderCompanyService.createCustomer(company);

        // Update the company object with the external provider id
        company.externalProviderId = customer?.id;
      }

      // If the still isn't an externalProviderId, throw an error
      if (!company.externalProviderId) {
        throw new Error(
          `Cannot create checkout session for company ${companyId} because the company does not have an externalProviderId`
        );
      }

      // Extra check to make sure the customer actually exists at the external provider
      let customer = await this.stripe.customers.retrieve(
        company.externalProviderId
      );

      // If the customer does not exist, create a new one. This could only happen when the customer is deleted at the external provider or the externalProviderId is invalid
      if (!customer) {
        customer = await this.externalProviderCompanyService.createCustomer(
          company
        );
      }

      if (!customer) {
        throw new Error(
          `Cannot create checkout session for company ${companyId} because the company does not have a valid customer at the external provider`
        );
      }

      // Generate a random token to use as a session token
      const token = crypto.randomBytes(32).toString('hex');

      const sessionRequest: Stripe.Checkout.SessionCreateParams = {
        mode: plan?.product?.modeType.toLowerCase() as Stripe.Checkout.SessionCreateParams.Mode,
        customer: customer?.id,
        line_items: [
          {
            price: plan.externalProviderId,
            quantity: args.data.quantity ?? 1,
          },
        ],

        automatic_tax: {
          enabled: true,
        },
        success_url: `${process.env.STRIPE_SUCCESS_RETURN_PAGE}/${token}`,
        cancel_url: `${process.env.STRIPE_FAILURE_RETURN_PAGE}`,
      };

      if (plan?.externalProviderPaymentMethodId) {
        sessionRequest.payment_method_configuration =
          plan?.externalProviderPaymentMethodId;
      }

      if (plan?.product?.modeType === ModeType.PAYMENT) {
        sessionRequest.invoice_creation = {
          enabled: true,
        };
      }

      const session = (await this.stripe.checkout.sessions.create(
        sessionRequest
      )) as Stripe.Checkout.Session;

      return this.checkoutRepository.create({
        data: {
          planId,
          companyId,
          userId,
          token,
          sessionId: session?.id,
        },
        select: {
          ...args.select,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByToken(token: string, companyId: number) {
    return this.checkoutRepository.findUniqueOrThrow({
      where: { token, companyId },
      include: {
        plan: {
          include: {
            contracts: {
              where: {
                companyId,
              },
              take: 1,
              orderBy: {
                id: 'desc',
              },
            },
            product: true,
          },
        },
      },
    });
  }
}
