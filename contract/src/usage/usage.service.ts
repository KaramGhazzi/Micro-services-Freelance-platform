import { ProductSlug } from '@freelance/contract/client';
import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as pMap from 'p-map';
import { Interval, UsageType } from '../../types/graphql/@generated';
import { Credit } from '../../types/graphql/usage/credit.model';
import { ContractRepository } from '../contract/contract.repository';
import {
  calculateMonthlyUsageReferenceDate,
  calculateWeeklyUsageReferenceData,
  calculateYearlyUsageReferenceDate,
} from './usage.reference.date';
import { UsageRepository } from './usage.repository';

@Injectable()
export class UsageService {
  private logger: Logger = new Logger(UsageService.name);

  public constructor(
    private readonly usageRepository: UsageRepository,
    private readonly contractRepository: ContractRepository
  ) {}

  async remainingCredits(companyId: number): Promise<Array<Credit>> {
    const contracts = await this.contractRepository.findMany({
      where: {
        AND: [
          { companyId },
          {
            OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
          },
        ],
      },
      include: UsageService.getContractInclude(),
    });

    const remainingCredits = await pMap(
      contracts,
      async (contract) => this.remainingCreditsForContract(contract),
      { concurrency: 3 }
    );

    return remainingCredits;
  }

  async remainingCreditsByCreditType(
    companyId: number,
    usageType: string
  ): Promise<Credit> {
    const contract = await this.getActiveContractByType(companyId, usageType);

    if (!contract) {
      return {
        usageType,
        amount: 0,
        contractAmount: 0,
      };
    }

    return this.remainingCreditsForContract(contract);
  }

  async remainingObjectCreditsByCreditType(
    companyId: number,
    usageType: string,
    objectId: number
  ) {
    const contract = await this.getActiveContractByType(companyId, usageType);

    if (!contract) {
      return {
        usageType,
        amount: 0,
        contractAmount: 0,
      };
    }

    const previousUsage = await this.usageRepository.findFirst({
      where: {
        companyId,
        type: UsageType[usageType],
        objectId,
      },
    });

    // Previously a credit has already been used for this object. You don't need any more credits for this usage.
    if (previousUsage) {
      return {
        usageType,
        amount: 1,
        contractAmount: contract.usageAmount,
      };
    }

    return this.remainingCreditsForContract(contract);
  }

  private async getActiveContractByType(companyId: number, usageType: string) {
    return this.contractRepository.findFirst({
      where: {
        AND: [
          { companyId },
          { OR: [{ endDate: null }, { endDate: { gte: new Date() } }] },
          { usageType: UsageType[usageType] },
        ],
      },
      include: UsageService.getContractInclude(),
      orderBy: { id: 'desc' },
    });
  }

  async remainingCreditsByProductSlug(
    companyId: number,
    productSlug: ProductSlug
  ): Promise<Credit> {
    const contract = await this.getActiveContractByProductSlug(
      companyId,
      productSlug
    );

    if (!contract) {
      return {
        amount: 0,
        contractAmount: 0,
      };
    }

    return this.remainingCreditsForContract(contract);
  }

  private async getActiveContractByProductSlug(
    companyId: number,
    productSlug: ProductSlug
  ) {
    return this.contractRepository.findFirst({
      where: {
        AND: [
          { companyId },
          { plan: { product: { slug: productSlug } } },
          { OR: [{ endDate: null }, { endDate: { gte: new Date() } }] },
        ],
      },
      include: UsageService.getContractInclude(),
      orderBy: { id: 'desc' },
    });
  }

  private static getContractInclude() {
    return {
      plan: {
        include: {
          product: true,
        },
      },
    };
  }

  private async remainingCreditsForContract(contract): Promise<Credit> {
    const now = new Date();
    let referenceDate: Date;
    let refreshDate: Date;

    switch (contract.usageInterval) {
      case Interval.WEEK: {
        referenceDate = calculateWeeklyUsageReferenceData(
          now,
          contract.startDate
        );

        refreshDate = new Date(referenceDate);
        refreshDate.setDate(refreshDate.getDate() + 7);
        break;
      }

      case Interval.MONTH: {
        referenceDate = calculateMonthlyUsageReferenceDate(
          now,
          contract.startDate
        );

        refreshDate = dayjs(referenceDate).add(1, 'month').toDate();

        break;
      }

      case Interval.YEAR: {
        referenceDate = calculateYearlyUsageReferenceDate(
          now,
          contract.startDate
        );

        refreshDate = dayjs(referenceDate).add(1, 'year').toDate();

        break;
      }

      case Interval.NONE: {
        referenceDate = contract.startDate;
        refreshDate = contract.startDate;

        break;
      }

      default: {
        const message = `${contract.usageInterval} is currently an unsupported usage interval for credit renewal.`;
        this.logger.error(message);

        throw new Error(message);
      }
    }

    const usage = await this.usageRepository.company(
      contract.companyId,
      contract.usageType,
      referenceDate
    );

    return {
      usageType: contract.usageType,
      amount: contract.usageAmount - usage,
      refreshDate,
      contractAmount: contract.usageAmount,
      contractStartDate: contract.startDate,
      contractEndDate: contract.endDate,
      productSlug: contract.plan.product.slug,
    };
  }

  // Get the remaining credits for all assignments whether active or not
  async assignmentsRemainingCredits(companyId: number): Promise<Array<Credit>> {
    const contracts = await this.contractRepository.findMany({
      where: {
        AND: [
          { companyId },
          {
            usageType: {
              equals: UsageType.ASSIGNMENT,
            },
          },
        ],
      },
      include: UsageService.getContractInclude(),
    });

    const remainingCredits = await pMap(
      contracts,
      async (contract) => this.remainingCreditsForContract(contract),
      { concurrency: 3 }
    );

    return remainingCredits;
  }

  // Handles usage that is linked to an object, at the time of writing this is only applicable to assignment views.
  // Once an assignment has been viewed, viewing it again will not cost another credit.
  async handleObjectUsage(
    companyId: number,
    usageType: UsageType,
    objectId: number
  ) {
    const alreadyExistingUsage = await this.usageRepository.findFirst({
      where: {
        companyId,
        type: usageType,
        objectId,
      },
    });

    if (alreadyExistingUsage) {
      return;
    }

    await this.usageRepository.create({
      data: {
        companyId,
        type: usageType,
        objectId,
        amount: 1,
      },
    });
  }
}
