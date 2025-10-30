import Stripe from 'stripe';
import { Inject } from '@nestjs/common';
import { ResolveReference } from '@nestjs/graphql';
import { Contract } from '../../types/graphql/@generated';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';
import { ContractRepository } from '../contract/contract.repository';

export enum Status {
  draft = 'PENDING',
  open = 'AWAITING',
  paid = 'COMPLETED',
  uncollectible = 'FAILED',
  void = 'CANCELLED',
}

type StripeList = {
  customer: string;
  limit: number;
  starting_after?: string;
};

export class InvoiceService {
  public constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly companyRepository: ExternalProviderCompanyRepository,
    private readonly contractRepository: ContractRepository
  ) {}

  // @TODO skipping with a number does not work for stripe, what to do?
  async invoices(
    companyId: number,
    limit = 10,
    startAfterInvoiceId = undefined
  ) {
    const company = await this.companyRepository.findUnique({
      where: {
        companyId,
      },
    });

    if (!company) {
      throw new Error(
        `Cannot find company ${companyId} for subscription invoices`
      );
    }

    const query: StripeList = {
      customer: company.externalProviderId,
      limit,
    };

    if (startAfterInvoiceId) {
      query.starting_after = startAfterInvoiceId;
    }

    const { data } = await this.stripe.invoices.list(query);

    return data.map(async (invoice: Stripe.Invoice) => {
      const contract = (await this.contractRepository.findFirst({
        where: {
          externalProviderId:
            invoice?.subscription?.toString() ??
            invoice?.payment_intent?.toString(),
        },
        select: {
          plan: {
            select: {
              product: {
                select: {
                  description: true,
                },
              },
            },
          },
        },
      })) as Contract;

      return {
        id: invoice.id,
        name: invoice.number,
        status: invoice.status,
        date: (invoice.status_transitions?.paid_at ?? 0) * 1000,
        priceInclVat: invoice.amount_due,
        priceExVat: invoice.total_excluding_tax,
        downloadLink: invoice.invoice_pdf,
        subscription: contract?.plan?.product?.description,
      };
    });
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.stripe.subscriptions.retrieve(reference.id);
  }
}
