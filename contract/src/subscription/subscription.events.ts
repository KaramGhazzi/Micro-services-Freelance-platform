import { Injectable, Inject, Logger } from '@nestjs/common';
import { Subscribe, Topic } from '@package/azure-service-bus';
import {
  SubscriptionDeletedEvent,
  SubscriptionUpdatedEvent,
  SubscriptionGetByCompanyEvent,
  SubscriptionGetByCompanyEventResponse,
} from '@package/types';
import { Contract, ProductSlug } from '@freelance/contract/client';
import Stripe from 'stripe';
import { PlanRepository } from '../plan/plan.repository';
import { ContractService } from '../contract/contract.service';
import { ContractRepository } from '../contract/contract.repository';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';

enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  PAST_DUE = 'past_due',
  PAUSED = 'paused',
  TRIALING = 'trialing',
  UNPAID = 'unpaid',
}

@Injectable()
export class SubscriptionEvents {
  private readonly logger = new Logger(SubscriptionEvents.name);

  constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly companyRepository: ExternalProviderCompanyRepository,
    private readonly planRepository: PlanRepository,
    private readonly contractRepository: ContractRepository,
    private readonly contractService: ContractService
  ) {}

  @Subscribe(Topic.WEBHOOK_SUBSCRIPTION_DELETED)
  async handleSubscriptionEnded(body: SubscriptionDeletedEvent): Promise<void> {
    try {
      const contract = await this.getContractByExternalProviderId(body);
      if (contract === null) {
        return;
      }

      await this.createFreelancerBasicContract(contract.companyId);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Subscribe(Topic.CONTRACT_SUBSCRIPTION_GET_BY_COMPANY)
  async handleSubscriptionNotification(
    body: SubscriptionGetByCompanyEvent
  ): Promise<SubscriptionGetByCompanyEventResponse> {
    try {
      const { companyId } = body;
      this.logger.log('received subscription request for companyId', companyId);

      const subscriptions = await this.contractService.getActiveContractSlugs(
        companyId
      );

      // if we don't have a subscription, return undefined
      if (!subscriptions.length) {
        return { success: false, error: 'no-subscriptions' };
      }

      return { success: true, subscriptions };
    } catch (e) {
      this.logger.error(e);
      return { success: false, error: e.message };
    }
  }

  @Subscribe(Topic.WEBHOOK_SUBSCRIPTION_UPDATED)
  async handleSubscriptionUpdated(
    body: SubscriptionUpdatedEvent
  ): Promise<void> {
    // Currently we are only interested in subscriptions that have ended
    if (
      body.status !== SubscriptionStatus.UNPAID &&
      body.status !== SubscriptionStatus.CANCELED
    ) {
      return;
    }

    const contract = await this.getContractByExternalProviderId(body);
    if (contract === null) {
      return;
    }

    if (contract.endDate !== null && contract.endDate <= new Date()) {
      // We received an update on a contract that already ended. Ignore for now.
      return;
    }

    contract.endDate = new Date();

    await this.contractRepository.update({
      where: { id: contract.id },
      data: contract,
    });

    await this.createFreelancerBasicContract(contract.companyId);
  }

  private async createFreelancerBasicContract(companyId: number) {
    const basicPlan = await this.planRepository.findFirst({
      where: {
        product: {
          slug: ProductSlug.FREELANCER_BASIC,
        },
      },
    });

    await this.contractService.createContractFromPlan(
      basicPlan,
      companyId,
      null
    );
  }

  private async getContractByExternalProviderId(
    body: SubscriptionDeletedEvent | SubscriptionUpdatedEvent
  ): Promise<Contract | null> {
    if (!body?.id) {
      this.logger.error(
        `Could not find subscription id in subscription ended event`
      );
      return null;
    }

    const contract = await this.contractRepository.findFirstOrThrow({
      where: {
        externalProviderId: body?.id,
      },
    });

    if (!contract) {
      this.logger.error(
        `Could not find contract for subscription id: ${body?.id}`
      );
      return null;
    }

    return contract;
  }
}
