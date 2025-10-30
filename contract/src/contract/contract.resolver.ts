import {
  Args,
  Info,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Authorized,
  AuthorizationCacheService,
  CurrentCompanyId,
} from '@package/authorization';
import { Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { Prisma } from '@freelance/contract/client';
import { PlanRepository } from '../plan/plan.repository';
import { PrismaSelectPipe } from '../decorators/prisma-select.decorator';
import { StripeSubscription } from '../../types/graphql/subscription/subscription.model';
import { CreateContractOutput } from '../../types/graphql/contract/create-contract.output';
import { EndProContractOutput } from '../../types/graphql/contract/end-pro-contract.output';
import { UpdateContractOutput } from '../../types/graphql/contract/update-contract.output';
import {
  Contract,
  ContractUpdateInput,
  FindManyContractArgs,
  ProductSlug,
} from '../../types/graphql/@generated';
import { ContractRepository } from './contract.repository';
import { ContractService } from './contract.service';
import { CustomContractCreateInput } from '../../types/graphql/contract/create-contract.input';

@Resolver(() => Contract)
export class ContractResolver {
  private defaultSelect: Prisma.ContractSelect = {
    id: true,
    companyId: true,
    externalProviderId: true,
    planId: true,
    startDate: true,
    endDate: true,
    usageType: true,
    usageAmount: true,
    usageInterval: true,
    usageIntervalCount: true,
    subscriptionExpireDate: true,
    renewalInterval: true,
  };

  constructor(
    private readonly contractRepository: ContractRepository,
    @Inject('STRIPE_SERVICE') private readonly stripe: Stripe,
    private readonly planRepository: PlanRepository,
    private readonly authorizationCache: AuthorizationCacheService,
    private readonly contractService: ContractService
  ) {}

  @Authorized({ permissions: ['contracts:get'] })
  @Query(() => [Contract])
  async contracts(
    @Info(PrismaSelectPipe) select: Prisma.ContractSelect,
    @Args() args: FindManyContractArgs,
    @CurrentCompanyId() companyId: number
  ) {
    return this.contractRepository.findMany({
      ...args,
      select: {
        ...select,
        ...this.defaultSelect,
      },
      where: {
        ...args.where,
        companyId,
      },
    });
  }

  @Authorized()
  @Query(() => [Contract])
  async topBoxCompanies(@Info(PrismaSelectPipe) select: Prisma.ContractSelect) {
    return this.contractRepository.findMany({
      where: {
        plan: {
          product: {
            slug: ProductSlug.TOP_BOX,
          },
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
      select,
    });
  }

  @Authorized()
  @Query(() => Boolean)
  async hasCompanyProfile(
    @Args('companyId', { type: () => Int }) companyId: number
  ) {
    const companyProfile = await this.contractRepository.findFirst({
      where: {
        plan: {
          product: {
            slug: ProductSlug.COMPANY_PREMIUM_PROFILE,
          },
        },
        companyId: {
          equals: companyId,
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

    return !!companyProfile;
  }

  @ResolveField(() => StripeSubscription, { nullable: true })
  async subscription(@Parent() contract: Contract) {
    return (
      contract?.externalProviderId &&
      this.stripe.subscriptions.retrieve(contract?.externalProviderId)
    );
  }

  @Authorized({ permissions: ['active-contract-slugs:get-collection'] })
  @Query(() => [String])
  async activeContractSlugs(@CurrentCompanyId() currentCompanyId: number) {
    return this.contractService.getActiveContractSlugs(currentCompanyId);
  }

  @Authorized({ permissions: ['admin:contracts:create'] })
  @Mutation(() => CreateContractOutput)
  async createContract(@Args('input') input: CustomContractCreateInput) {
    return this.contractService.createCustomContract(input);
  }

  @Authorized({ permissions: ['admin:contracts:end'] })
  @Mutation(() => EndProContractOutput)
  async endProContract(
    @Args('companyId') companyId: number,
    @Args('proEndDate') proEndDate: string,
    @Args('basicCompanyStartDate') basicCompanyStartDate: string
  ) {
    return this.contractService.endProContracts(
      companyId,
      proEndDate,
      basicCompanyStartDate
    );
  }

  @Authorized({ permissions: ['admin:contracts:update'] })
  @Mutation(() => UpdateContractOutput)
  async updateContract(
    @Args('contractId') contractId: number,
    @Args('companyId') companyId: number,
    @Args('input') input: ContractUpdateInput
  ) {
    return this.contractService.updateContract(contractId, companyId, input);
  }
}
