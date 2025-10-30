import { Args, Resolver, Query } from '@nestjs/graphql';
import { Authorized, CurrentCompanyId } from '@package/authorization';
import { ProductSlug } from '@freelance/contract/client';
import { Credit } from '../../types/graphql/usage/credit.model';
import { UsageService } from './usage.service';

@Resolver()
export class UsageResolver {
  public constructor(private readonly usageService: UsageService) {}

  @Authorized()
  @Query(() => [Credit])
  async remainingUsage(
    @CurrentCompanyId() companyId: number
  ): Promise<Array<Credit>> {
    return this.usageService.remainingCredits(companyId);
  }

  @Authorized()
  @Query(() => Credit)
  async remainingUsageByCreditType(
    @CurrentCompanyId() companyId: number,
    @Args('usageType') usageType: string
  ) {
    return this.usageService.remainingCreditsByCreditType(companyId, usageType);
  }

  @Authorized()
  @Query(() => Credit)
  async remainingUsageByProductSlug(
    @CurrentCompanyId() companyId: number,
    @Args('productSlug') productSlug: ProductSlug
  ) {
    return this.usageService.remainingCreditsByProductSlug(
      companyId,
      productSlug
    );
  }

  @Authorized()
  @Query(() => [Credit])
  async assignmentsRemainingUsage(
    @CurrentCompanyId() companyId: number
  ): Promise<Array<Credit>> {
    return this.usageService.assignmentsRemainingCredits(companyId);
  }
}
