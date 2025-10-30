import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as process from 'process';
import type Stripe from 'stripe';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';
import { ExternalProviderCompanyService } from '../external-provider-company/external-provider-company.service';
import { ContractRepository } from './contract.repository';
import { ContractService } from './contract.service';

@Injectable()
export class ContractCron {
  private readonly logger = new Logger(ContractCron.name);

  public constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractService: ContractService,
    private readonly externalProviderCompanyRepository: ExternalProviderCompanyRepository,
    private readonly externalProviderCompanyService: ExternalProviderCompanyService,
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleLegacyProContracts() {
    // The stripe cron has emailed real people from the testing environment.
    // We don't want that again, so check if the LEGACY_CONTRACT_CRON_DISABLED
    // env var exists and dont do anything if it is set to 1.
    if (
      'LEGACY_CONTRACT_CRON_DISABLED' in process.env &&
      process.env.LEGACY_CONTRACT_CRON_DISABLED === '1'
    ) {
      this.logger.debug('Legacy pro contract cron disabled');

      return;
    }

    this.logger.debug('Legacy pro contract cron enabled');

    try {
      // Select freelancer pro contracts that are expired but not ended.
      const legacyProContracts = await this.contractRepository.findMany({
        where: {
          OR: [{ externalProviderId: null }, { externalProviderId: '' }],
          endDate: null,
          subscriptionExpireDate: {
            lte: new Date(),
          },
          plan: {
            product: {
              slug: 'FREELANCER_PRO',
            },
          },
        },
        select: {
          id: true,
          companyId: true,
          plan: {
            select: {
              id: true,
              externalProviderId: true,
            },
          },
        },
      });

      await Promise.allSettled(
        legacyProContracts.map((contract) =>
          this.createStripeContract(contract).catch((error) =>
            this.logger.error(error)
          )
        )
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createStripeContract(legacyContract) {
    let externalProviderCompany =
      await this.externalProviderCompanyRepository.findUnique({
        where: { companyId: legacyContract.companyId },
      });

    // Company has not been synced yet to contract service, create an external provider company
    if (!externalProviderCompany) {
      externalProviderCompany =
        await this.externalProviderCompanyRepository.create({
          data: { companyId: legacyContract.companyId },
        });
    }

    if (!externalProviderCompany.externalProviderId) {
      // Create the customer in stripe
      const customer = await this.externalProviderCompanyService.createCustomer(
        externalProviderCompany
      );

      externalProviderCompany.externalProviderId = customer?.id;
    }

    const subscription = await this.stripe.subscriptions.create({
      customer: externalProviderCompany.externalProviderId,
      items: [
        {
          price: legacyContract.plan.externalProviderId,
        },
      ],
      collection_method: 'send_invoice',
      days_until_due: 14,
      payment_settings: {
        payment_method_types: ['customer_balance', 'ideal'],
      },
      automatic_tax: {
        enabled: true,
      },
    });

    await this.stripe.invoices.finalizeInvoice(
      subscription.latest_invoice as string
    );

    await this.contractRepository.update({
      where: { id: legacyContract.id },
      data: { endDate: new Date() },
    });

    await this.contractService.emitContractUpdated(legacyContract.id);

    await this.contractService.createFreelancerProContract(
      legacyContract.plan.id,
      legacyContract.companyId,
      subscription.id
    );
  }
}
