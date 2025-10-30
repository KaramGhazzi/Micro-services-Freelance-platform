import { Injectable, Logger } from '@nestjs/common';
import { Subscribe, Topic } from '@package/azure-service-bus';
import type Stripe from 'stripe';
import { ContractRepository } from '../contract/contract.repository';

@Injectable()
export class InvoiceEvents {
  private readonly logger = new Logger(InvoiceEvents.name);

  constructor(private readonly contractRepository: ContractRepository) {}

  @Subscribe(Topic.WEBHOOK_INVOICE_PAID)
  async handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
    let subscriptionId: string | null = null;
    if (invoice.subscription) {
      subscriptionId =
        typeof invoice.subscription === 'string'
          ? invoice.subscription
          : (invoice.subscription as Stripe.Subscription).id;
    }

    const paymentIntentId =
      typeof invoice.payment_intent === 'string'
        ? invoice.payment_intent
        : invoice.payment_intent?.id;

    // Only subscriptions have a subscription id, so we know that if we have a subscription id, we have a subscription.
    const externalProviderId = subscriptionId || paymentIntentId;

    // Small safety check to ensure we have a payment intent id.
    // If not, findFirst will use undefined and providing `undefined` is treated as the value not being there.
    // Read more here: https://pris.ly/d/null-undefined
    if (!externalProviderId) {
      this.logger.warn(
        `ExternalProviderId not found for invoice: ${invoice.id}`
      );
      return;
    }

    try {
      const contract = await this.contractRepository.findFirst({
        where: {
          externalProviderId,
        },
      });

      if (!contract) {
        this.logger.warn(`Contract not found for invoice:  ${invoice.id}`);
        return;
      }

      await this.contractRepository.update({
        where: {
          id: contract.id,
        },
        data: {
          invoiceId: invoice.id,
        },
      });

      this.logger.log(
        `Invoice ${invoice.id} processed successfully for contract ${contract.id}`
      );
    } catch (error) {
      this.logger.error(
        `Error processing invoice ${invoice.id}: ${error?.message}`,
        error
      );
    }
  }
}
