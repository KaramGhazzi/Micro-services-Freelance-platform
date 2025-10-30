import Stripe from 'stripe';
import { Inject } from '@nestjs/common';
import { PrivateSessionInfo } from '@package/authorization';
import { ContractRepository } from '../contract/contract.repository';

export class SubscriptionService {
  public constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly contractRepository: ContractRepository
  ) {}

  async cancelSubscription(contractId: number, user: PrivateSessionInfo) {
    const returnValue = { current_period_end: -1 };
    if (!user?.currentUserCompany) {
      return returnValue;
    }

    const { endDate: currentEndDate } = await this.contractRepository.findFirst(
      {
        where: {
          id: contractId,
        },
      }
    );

    if (currentEndDate) {
      returnValue.current_period_end = currentEndDate.getTime();

      return returnValue;
    }

    const { companyId } = user.currentUserCompany;
    const update = await this.updateStripe(contractId, companyId, true);

    const { currentUserCompany } = user;

    if (!currentUserCompany) {
      return returnValue;
    }

    const milliSeconds = 1000;
    if (update) {
      await this.contractRepository.update({
        where: {
          id: contractId,
        },
        data: {
          endDate: new Date(update.cancel_at * milliSeconds),
        },
      });
    }

    return { current_period_end: update?.current_period_end };
  }

  async enableSubscription(contractId: number, companyId: number) {
    const update = await this.updateStripe(contractId, companyId, false);
    if (update) {
      await this.contractRepository.update({
        where: {
          id: contractId,
        },
        data: {
          endDate: null,
        },
      });

      return update;
    }

    return null;
  }

  private async updateStripe(
    contractId: number,
    companyId: number,
    cancel: boolean
  ) {
    const externalContractId = await this.getContractExternalId(
      contractId,
      companyId
    );

    if (externalContractId) {
      return this.stripe.subscriptions.update(externalContractId, {
        cancel_at_period_end: cancel,
      });
    }

    return null;
  }

  private async getContractExternalId(contractId: number, companyId: number) {
    const companySubscription = await this.contractRepository.findFirstOrThrow({
      where: {
        id: contractId,
        companyId,
      },
    });

    return companySubscription?.externalProviderId;
  }
}
