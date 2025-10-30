import { ProductSlug } from '@freelance/contract/client';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AuthorizationCacheService,
  CacheCategory,
} from '@package/authorization';
import { CompanyTypeUpdatedEvent, ContractUpdatedEvent } from '@package/types';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';

import { CompanyType } from '@package/types/dist/class-validator';
import * as dayjs from 'dayjs';
import Stripe from 'stripe';
import * as pMap from 'p-map';
import { ProductRepository } from '../product/product.repository';
import { CustomContractCreateInput } from '../../types/graphql/contract/create-contract.input';
import {
  ContractUncheckedCreateInput,
  ContractUpdateInput,
  Interval,
  ModeType,
  Plan,
} from '../../types/graphql/@generated';
import { ContractOutput } from '../../types/graphql/contract/contract.output';
import { StripeSession } from '../../types/session/session.model';
import { PlanRepository } from '../plan/plan.repository';
import { ContractRepository } from './contract.repository';

type ExtraContractData = {
  startDate?: Date;
  endDate?: Date;
  usageAmount?: number;
  usageInterval?: Interval;
  externalProviderId?: string;
  renewalInterval?: string;
  invoiceId?: string;
};

@Injectable()
export class ContractService {
  public constructor(
    private readonly contractRepository: ContractRepository,
    private readonly planRepository: PlanRepository,
    private readonly productRepository: ProductRepository,
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly authorizationCache: AuthorizationCacheService,
    @Inject(Topic.CONTRACT_UPDATED)
    private readonly contractUpdatedClient: AzureServiceBusClient<ContractUpdatedEvent>
  ) {}

  async createFreelancerProContract(
    planId: number,
    companyId: number,
    externalProviderId: string
  ) {
    const proPlan: Plan = await this.planRepository.findFirst({
      where: {
        id: planId,
      },

      include: { product: true },
    });

    if (!proPlan) {
      Logger.warn(`Cannot find plan ${planId} while creating contract`);

      return;
    }

    if (proPlan?.product?.slug !== ProductSlug.FREELANCER_PRO) {
      Logger.warn(`Plan ${planId} is not a freelancer pro plan`);

      return;
    }

    // prevent creating a new contract if the company already has a pro contract
    const existingContract = await this.contractRepository.findFirst({
      where: {
        companyId,
        externalProviderId,
        planId: proPlan?.id,
      },
    });

    // prevent creating a new contract when refreshing the page after a successful payment
    if (existingContract) {
      Logger.warn(
        `Company ${companyId} already has a freelancer pro contract ${existingContract.id}`
      );

      return;
    }

    const newContract = await this.createContractFromPlan(proPlan, companyId, {
      externalProviderId,
    });

    // If the company still has freelancer basic plans, cancel them
    if (newContract) {
      await this.endContract(companyId, ProductSlug.FREELANCER_BASIC);
    }
  }

  async endProContracts(
    companyId: number,
    endDate: string,
    basicStartDate: string
  ) {
    const endDateObj = new Date(endDate);
    const basicStartDateObj = new Date(basicStartDate);

    const [freelancerContracts, basicPlans] = await Promise.all([
      this.contractRepository.findMany({
        where: {
          plan: {
            product: {
              slug: {
                in: [ProductSlug.FREELANCER_PRO, ProductSlug.FREELANCER_BASIC],
              },
            },
          },
          companyId,
        },
      }),
      this.planRepository.findMany({
        where: {
          product: {
            slug: {
              in: [
                ProductSlug.MARKETMONITOR_BASIC_APPLICATION,
                ProductSlug.MARKETMONITOR_BASIC_VIEW,
              ],
            },
          },
        },
      }),
    ]);

    if (basicPlans.length === 0 || freelancerContracts.length === 0) {
      Logger.warn('Freelancer plans or Basic plans not found');
      return { isSuccessful: false };
    }

    const updateContracts = freelancerContracts.map((contract) =>
      this.contractRepository.update({
        where: { id: contract.id },
        data: { endDate: endDateObj },
      })
    );

    const createContracts = basicPlans.map((plan) =>
      this.createContractFromPlan(plan, companyId, {
        startDate: basicStartDateObj,
      })
    );

    await Promise.all([...updateContracts, ...createContracts]);

    return { isSuccessful: true };
  }

  async createContractsFromPlans(
    plans: Plan[],
    companyId: number,
    session?: StripeSession
  ) {
    const externalProviderId = session
      ? this.getExternalProviderIdFromSession(session)
      : '';
    const endDate = await this.calculateEndDateFromSession(session);

    return Promise.all(
      plans.map(async (plan) => {
        await this.createContractFromPlan(plan, companyId, {
          externalProviderId,
          endDate,
        });
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  generateContractFromPlan(
    plan: Plan,
    companyId: number,
    extraData: ExtraContractData = {}
  ) {
    return {
      companyId,
      planId: plan.id,
      startDate: dayjs(extraData.startDate ?? new Date()).toDate(),
      usageType: plan.usageType,
      usageAmount: extraData.usageAmount ?? plan.usageAmount,
      usageInterval: extraData.usageInterval ?? plan.usageInterval,
      usageIntervalCount: plan.usageIntervalCount,
      renewalInterval: extraData.renewalInterval ?? plan.renewalInterval,
      subscriptionExpireDate: extraData.endDate
        ? dayjs(extraData.endDate).toDate()
        : null,
      externalProviderId: extraData.externalProviderId,
      endDate: extraData.endDate ? dayjs(extraData.endDate).toDate() : null,
      invoiceId: extraData.invoiceId ? extraData.invoiceId : undefined,
    } as ContractUncheckedCreateInput;
  }

  async createContractFromPlan(
    plan: Plan,
    companyId: number,
    extraData: ExtraContractData = {}
  ) {
    const newContract = await this.contractRepository.create({
      data: this.generateContractFromPlan(plan, companyId, extraData),
      include: {
        plan: {
          include: { product: true },
        },
      },
    });

    await this.updateActiveContractCache(companyId);
    await this.emitContractUpdated(newContract.id);

    return newContract;
  }

  async createTopAssignmentContract(
    planId: number,
    companyId: number,
    externalProviderId: string,
    endDate: Date,
    invoiceId?: string
  ) {
    const topAssignmentPlan: Plan = await this.planRepository.findFirst({
      where: {
        id: planId,
      },
      include: { product: true },
    });

    if (
      !topAssignmentPlan ||
      topAssignmentPlan?.product?.slug !== ProductSlug.COMPANY_TOP
    ) {
      Logger.warn(`Cannot find plan with id ${planId} while creating contract`);

      return;
    }

    const existingContract = await this.contractRepository.findFirst({
      where: {
        companyId,
        externalProviderId,
        planId: topAssignmentPlan?.id,
      },
    });

    // prevent creating a new contract with the same payment intent when refreshing the page after a successful payment
    if (existingContract) {
      Logger.warn(
        `Contract with the same payment intent already exists for company ${companyId}`
      );

      return;
    }

    const contract = await this.createContractFromPlan(
      topAssignmentPlan,
      companyId,
      {
        externalProviderId,
        endDate,
        invoiceId,
      }
    );

    if (contract) {
      await this.endContract(companyId, ProductSlug.COMPANY_BASIC);
    }
  }

  async createCustomContract(input: CustomContractCreateInput) {
    const plan = await this.planRepository.findFirst({
      where: { id: input.planId },
      include: {
        product: true,
      },
    });

    if (!plan) {
      throw new Error(`Plan with id ${input.planId} not found`);
    }

    const extraData: ExtraContractData = {
      startDate: input.startDate,
      endDate: input.endDate,
      usageAmount: input.usageAmount,
      usageInterval: input.usageInterval as Interval,
      renewalInterval: input.renewalInterval,
    };

    const contractToEnd = ContractService.getCorrespondingBasicContract(
      plan.product.slug
    );

    if (contractToEnd === ProductSlug.MARKETMONITOR_BASIC_APPLICATION) {
      // Because there are two separate marketmonitor contracts this function will create them both
      await this.handleMarketMonitorContracts(input.companyId, extraData);
    } else {
      const newContract = await this.createContractFromPlan(
        plan,
        input.companyId,
        extraData
      );

      if (!newContract) {
        throw new Error('Failed to create contract');
      }

      if (contractToEnd) {
        await this.endContract(
          input.companyId,
          contractToEnd,
          extraData.startDate
        );
      }
    }

    return { success: true };
  }

  async updateActiveContractCache(companyId: number) {
    const [contracts, companyInfo] = await Promise.all([
      this.getActiveContractSlugs(companyId),
      this.authorizationCache.get(CacheCategory.COMPANY, `${companyId}`),
    ]);

    if (companyInfo === undefined) {
      return;
    }

    // @TODO not all products are subscriptions, filter results
    companyInfo.subscriptions = contracts as ProductSlug[];

    await this.authorizationCache.set(
      CacheCategory.COMPANY,
      `${companyId}`,
      companyInfo
    );
  }

  async updateContract(
    contractId: number,
    companyId: number,
    contractsData: ContractUpdateInput
  ): Promise<{ isSuccess: boolean }> {
    const contract = await this.contractRepository.findUnique({
      where: { id: contractId, companyId },
      include: { plan: { include: { product: true } } },
    });

    if (!contract) {
      Logger.warn('Contract not found');
      return { isSuccess: false };
    }

    const updatedContract = await this.contractRepository.update({
      where: { id: contractId, companyId },
      data: {
        startDate: dayjs(contractsData.startDate ?? new Date()).toDate(),
        endDate: contractsData.endDate ? new Date(contractsData.endDate) : null,
        usageType: contractsData.usageType,
        usageAmount: contractsData.usageAmount,
        usageInterval: contractsData.usageInterval,
        renewalInterval: contractsData.renewalInterval,
      },
    });

    if (updatedContract) {
      return { isSuccess: true };
    }

    return { isSuccess: false };
  }

  async handleMarketMonitorContracts(
    companyId: number,
    extraData?: ExtraContractData
  ) {
    const marketmonitorPremiumPlans = await this.planRepository.findMany({
      where: {
        product: {
          OR: [
            { slug: ProductSlug.MARKETMONITOR_PREMIUM_APPLICATION },
            { slug: ProductSlug.MARKETMONITOR_PREMIUM_VIEW },
          ],
        },
      },
    });

    if (marketmonitorPremiumPlans.length < 2) {
      throw new Error('Plans for Marketmonitor Premium not found');
    }

    const contractsData = marketmonitorPremiumPlans.map((plan) =>
      this.generateContractFromPlan(plan, companyId, extraData)
    );

    const newContracts = await Promise.all(
      contractsData.map((data) => this.contractRepository.create({ data }))
    );

    await Promise.all(
      newContracts.map((contract) => this.emitContractUpdated(contract.id))
    );

    if (newContracts) {
      await Promise.all([
        this.endContract(
          companyId,
          ProductSlug.MARKETMONITOR_BASIC_APPLICATION,
          extraData.startDate
        ),
        this.endContract(
          companyId,
          ProductSlug.MARKETMONITOR_BASIC_VIEW,
          extraData.startDate
        ),
      ]);
    }
  }

  async endContract(
    companyId: number,
    productSlug: ProductSlug,
    endDate: Date = new Date()
  ) {
    const contractToEnd = await this.contractRepository.findMany({
      where: {
        companyId,
        plan: { product: { slug: productSlug } },
        endDate: null,
      },
      select: {
        id: true,
        endDate: true,
      },
    });

    if (!contractToEnd || contractToEnd.length === 0 || !endDate) {
      return;
    }

    if (typeof endDate === 'string') {
      Logger.debug(
        `endContract endDate '${endDate}' is a string, converting to date`
      );
      // eslint-disable-next-line no-param-reassign
      endDate = new Date(endDate);
    }

    contractToEnd.forEach(async (basicContract) => {
      await this.contractRepository.update({
        where: { id: basicContract.id },
        data: { endDate },
      });

      await this.emitContractUpdated(basicContract.id);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getExternalProviderIdFromSession(session: StripeSession): string {
    const modeType = session.mode.toUpperCase() as ModeType;

    if (
      modeType === ModeType.PAYMENT &&
      typeof session.payment_intent === 'string'
    ) {
      return session.payment_intent;
    }

    if (
      modeType === ModeType.SUBSCRIPTION &&
      typeof session.subscription === 'string'
    ) {
      return session.subscription;
    }

    throw new Error(`Invalid mode type ${modeType}`);
  }

  async getActiveContractSlugs(companyId: number): Promise<string[]> {
    // @TODO Map this to a future ENUM
    return (await this.getCompaniesActiveContractsSlugs([companyId]))?.find(
      (contract) => contract.companyId
    )?.slugs;
  }

  async getCompaniesActiveContractsSlugs(
    companyIds: number[]
  ): Promise<ContractOutput[]> {
    const data = await this.contractRepository.findMany({
      select: {
        companyId: true,
        plan: {
          select: {
            product: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
      where: {
        companyId: {
          in: companyIds,
        },
        startDate: {
          lte: new Date(),
        },
        OR: [
          {
            endDate: {
              gt: new Date(),
            },
          },
          { endDate: null },
        ],
      },
    });
    const contractOutput: ContractOutput[] = [];

    companyIds.forEach((companyId) => {
      const companyContracts = data
        .filter((contract) => contract.companyId === companyId)
        .map((contract) => contract.plan?.product?.slug);
      contractOutput.push({ companyId, slugs: companyContracts });
    });

    // @TODO Map this to a future ENUM
    return contractOutput;
  }

  private static getCorrespondingBasicContract(slug: ProductSlug) {
    switch (slug) {
      case ProductSlug.FREELANCER_PRO:
        return ProductSlug.FREELANCER_BASIC;
      case ProductSlug.COMPANY_TOP:
        return ProductSlug.COMPANY_BASIC;
      case ProductSlug.COMPANY_PREMIUM_ASSIGNMENT:
        return ProductSlug.COMPANY_BASIC;
      case ProductSlug.COMPANY_PREMIUM_PROFILE:
        return null;
      case ProductSlug.MARKETMONITOR_PREMIUM_APPLICATION:
        return ProductSlug.MARKETMONITOR_BASIC_APPLICATION;
      case ProductSlug.TOP_BOX:
        return null;
      default:
        return null;
    }
  }

  async calculateEndDateFromSession(
    session: StripeSession
  ): Promise<Date | null> {
    const mode = session?.mode.toUpperCase() as ModeType;
    if (mode === ModeType.PAYMENT && session?.payment_intent) {
      const periodEnd =
        (
          await this.stripe.paymentIntents.retrieve(
            session?.payment_intent as string
          )
        ).created * 1000;

      const endDate = new Date(periodEnd);
      endDate.setFullYear(endDate.getFullYear() + 1);
      return endDate;
    }

    return null;
  }

  async handleCompanyTypeChange(body: CompanyTypeUpdatedEvent): Promise<void> {
    try {
      if (body.newType === CompanyType.FREELANCER) {
        await this.changeCompanyTypeToFreelancer(body.companyId);
      } else {
        await this.changeCompanyTypeToOrganisation(body.companyId);
      }
    } catch (error) {
      Logger.error(
        `Failed to change company type for company ${body.companyId}`
      );
    }
  }

  private async changeCompanyTypeToFreelancer(
    companyId: number
  ): Promise<void> {
    const freelancerPlan = await this.getPlanBySlug(
      ProductSlug.FREELANCER_BASIC
    );
    if (!freelancerPlan) {
      Logger.warn('No Basic Freelancer plan found');
      return;
    }

    await this.createContractFromPlan(freelancerPlan, companyId);

    const marketMonitorSlugs = [
      ProductSlug.MARKETMONITOR_BASIC_APPLICATION,
      ProductSlug.MARKETMONITOR_BASIC_VIEW,
      ProductSlug.MARKETMONITOR_PREMIUM_APPLICATION,
      ProductSlug.MARKETMONITOR_PREMIUM_VIEW,
    ];

    await this.endContracts(companyId, marketMonitorSlugs);
  }

  private async changeCompanyTypeToOrganisation(
    companyId: number
  ): Promise<void> {
    const marketMonitorSlugs = [
      ProductSlug.MARKETMONITOR_BASIC_VIEW,
      ProductSlug.MARKETMONITOR_BASIC_APPLICATION,
    ];

    const productSlugs = await this.productRepository.findMany({
      where: { slug: { in: marketMonitorSlugs } },
    });

    if (productSlugs.length === marketMonitorSlugs.length) {
      const marketMonitorPlans = await this.getPlansBySlugs(marketMonitorSlugs);
      const activeContract = await this.getActiveContract(
        companyId,
        marketMonitorSlugs
      );

      if (marketMonitorPlans.length && !activeContract) {
        await this.createContractsFromPlans(marketMonitorPlans, companyId);
      } else {
        Logger.warn(
          'Basic Marketmonitor plans not found or company already has active contract'
        );
      }

      await this.endContract(companyId, ProductSlug.FREELANCER_BASIC);
    } else {
      Logger.warn('Marketmonitor plans not found');
    }
  }

  private async getPlanBySlug(slug: ProductSlug) {
    return this.planRepository.findFirst({
      where: { product: { slug } },
    });
  }

  private async getPlansBySlugs(slugs: ProductSlug[]) {
    return this.planRepository.findMany({
      where: { product: { slug: { in: slugs } } },
    });
  }

  private async getActiveContract(companyId: number, slugs: ProductSlug[]) {
    return this.contractRepository.findFirst({
      where: {
        companyId,
        OR: [
          { endDate: null },
          { endDate: { gt: new Date() } }, // Checks if endDate is in the future
        ],
        plan: { product: { slug: { in: slugs } } },
      },
    });
  }

  private async endContracts(companyId: number, slugs: ProductSlug[]) {
    try {
      await pMap(
        slugs,
        async (slug) => {
          try {
            Logger.debug(`Ending contract for slug: ${slug}`);
            await this.endContract(companyId, slug);
            Logger.debug(`Successfully ended contract for slug: ${slug}`);
          } catch (error) {
            Logger.error(`Failed to end contract for slug: ${slug}`, error);
            throw error; // Will stop further processing if stopOnError is true
          }
        },
        {
          stopOnError: true,
        }
      );
    } catch (error) {
      Logger.error('Error in endContracts:', error);
    }
  }

  async emitContractUpdated(contractId: number) {
    const contract = await this.contractRepository.findUnique({
      where: { id: contractId },
      include: { plan: { include: { product: true } } },
    });

    if (contract === null || contract === undefined) {
      Logger.warn(`contract ${contractId} not found`);

      return;
    }

    const renewable = contract.plan.product.modeType === ModeType.SUBSCRIPTION;
    const renewEnabled = renewable && contract.endDate !== null;

    let amount = 0;
    if (contract.plan.product.externalProviderSync) {
      const price = await this.stripe.prices.retrieve(
        contract.plan.externalProviderId
      );

      if (price?.unit_amount) {
        amount = renewable
          ? price.unit_amount
          : price.unit_amount * contract.usageAmount;
      }
    }

    const endDate = contract.endDate ?? contract.subscriptionExpireDate;

    const contractUpdatedEvent: ContractUpdatedEvent = {
      contractId,
      companyId: contract.companyId,
      renewable,
      renewEnabled,
      contractType: contract.plan.slug,
      planId: contract.plan.id,
      price: amount,
      endDate,
    };

    await this.contractUpdatedClient.emit({
      payload: { body: contractUpdatedEvent },
    });
  }
}
