import { ProductSlug } from '@freelance/contract/client';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Subscribe, Topic } from '@package/azure-service-bus';
import type Stripe from 'stripe';
import { StripeSession } from '../../types/session/session.model';
import { CheckoutRepository } from '../checkout/checkout.repository';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class PaymentEvents {
  private readonly logger = new Logger(PaymentEvents.name);

  constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly contractService: ContractService,
    private readonly checkoutRepository: CheckoutRepository
  ) {}

  @Subscribe(Topic.WEBHOOK_PAYMENT_SUCCEEDED)
  async handlePaymentSucceeded(body: Stripe.PaymentIntent): Promise<void> {
    if (body?.status !== 'succeeded') {
      return;
    }

    const isPayLaterFlow = await this.checkPayLaterFlow(body);
    if (isPayLaterFlow) {
      return;
    }

    await this.processSuccessfulPayment(body);
  }

  /**
   * Checks if the payment is part of a Pay Later flow.
   *
   * @param body - The Stripe PaymentIntent object.
   * @returns A boolean indicating whether the payment is part of a Pay Later flow.
   *
   * This function:
   * 1. Checks if the PaymentIntent has an associated invoice.
   * 2. Retrieves the invoice from Stripe if it exists.
   * 3. Checks the invoice metadata for a 'isPayLaterFlow' flag.
   * 4. Logs a message and returns true if it's a Pay Later flow.
   * 5. Returns false otherwise.
   */
  private async checkPayLaterFlow(
    body: Stripe.PaymentIntent
  ): Promise<boolean> {
    if (body.invoice) {
      const invoiceId =
        typeof body.invoice === 'string' ? body.invoice : body.invoice.id;
      const invoice = await this.stripe.invoices.retrieve(invoiceId);

      if (String(invoice.metadata.isPayLaterFlow).toLowerCase() === 'true') {
        this.logger.log(
          `Payment is part of Pay Later flow, skipping contract creation for invoice: ${invoice.id}`
        );
        return true;
      }
    }
    return false;
  }

  /**
   * Processes a successful payment and creates the appropriate contract.
   *
   * @param body - The Stripe PaymentIntent object.
   *
   * This function:
   * 1. Retrieves the checkout session using the payment intent.
   * 2. Fetches the associated checkout data from the repository.
   * 3. Determines the external provider ID and end date from the session.
   * 4. Creates either a Freelancer Pro or Top Assignment contract based on the product slug.
   */
  private async processSuccessfulPayment(
    body: Stripe.PaymentIntent
  ): Promise<void> {
    const session = await this.stripe.checkout.sessions.list({
      payment_intent: body.id,
    });

    const checkout = await this.checkoutRepository.findFirstOrThrow({
      where: {
        sessionId: session.data[0].id,
      },
      select: {
        planId: true,
        plan: {
          select: {
            product: {
              select: {
                slug: true,
              },
            },
          },
        },
        companyId: true,
        userId: true,
      },
    });

    const externalProviderId =
      this.contractService.getExternalProviderIdFromSession(
        session.data[0] as StripeSession
      );

    const endDate = await this.contractService.calculateEndDateFromSession(
      session.data[0] as StripeSession
    );

    const slug = checkout?.plan?.product?.slug;

    if (slug === ProductSlug.FREELANCER_PRO) {
      await this.contractService.createFreelancerProContract(
        checkout.planId,
        checkout.companyId,
        externalProviderId
      );
    } else if (slug === ProductSlug.COMPANY_TOP) {
      await this.contractService.createTopAssignmentContract(
        checkout?.planId,
        checkout?.companyId,
        externalProviderId,
        endDate
      );
    }
  }
}
