import { Injectable, Inject, Logger, forwardRef } from '@nestjs/common';
import { Subscribe, Topic } from '@package/azure-service-bus';
import {
  CompanyRegisteredEvent,
  CompanyUpdatedEvent,
  CompanyTypeUpdatedEvent,
} from '@package/types/dist/events';
import Stripe from 'stripe';
import { ProductSlug } from '@freelance/contract/client';
import { CompanyType } from '@package/types/dist/class-validator/@generated/enums';
import { PlanRepository } from '../plan/plan.repository';
import { ExternalProviderCompanyRepository } from './external-provider-company.repository';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class ExternalProviderCompanyEvents {
  constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly planRepository: PlanRepository,
    private readonly externalProviderCompanyRepository: ExternalProviderCompanyRepository,
    @Inject(forwardRef(() => ContractService))
    private readonly contractService: ContractService
  ) {}

  private readonly logger = new Logger(ExternalProviderCompanyEvents.name);

  @Subscribe(Topic.COMPANY_REGISTERED)
  async handleCompanyRegistered(
    body: CompanyRegisteredEvent
  ): Promise<boolean> {
    try {
      await this.externalProviderCompanyRepository.create({
        data: {
          companyId: body.id,
        },
      });

      // Always create a basic company contract so everyone can create 3 assignments
      const companyPlan = await this.planRepository.findFirst({
        where: {
          product: {
            slug: ProductSlug.COMPANY_BASIC,
          },
        },
      });

      if (companyPlan) {
        await this.contractService.createContractFromPlan(companyPlan, body.id);
      } else {
        // Continue on, we might still be able to create the freelancer plan
        this.logger.warn('No default basic company plan found');
      }

      if (body.type !== CompanyType.FREELANCER) {
        const marketMonitorPlans = await this.planRepository.findMany({
          where: {
            OR: [
              {
                product: {
                  slug: ProductSlug.MARKETMONITOR_BASIC_VIEW,
                },
              },
              {
                product: {
                  slug: ProductSlug.MARKETMONITOR_BASIC_APPLICATION,
                },
              },
            ],
          },
        });

        if (marketMonitorPlans) {
          await this.contractService.createContractsFromPlans(
            marketMonitorPlans,
            body.id
          );
        } else {
          this.logger.warn('No default basic market monitor plan(s) found');
        }

        return true;
      }

      // Now create a basic freelance contract for freelancers
      const freelancerPlan = await this.planRepository.findFirst({
        where: {
          product: {
            slug: ProductSlug.FREELANCER_BASIC,
          },
        },
      });

      if (!freelancerPlan) {
        this.logger.warn('No default basic freelancer plan found');

        return false;
      }

      await this.contractService.createContractFromPlan(
        freelancerPlan,
        body.id
      );

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Subscribe(Topic.COMPANY_UPDATED)
  async handleCompanyUpdated(body: CompanyUpdatedEvent): Promise<void> {
    try {
      if (body?.id) {
        const { externalProviderId } =
          await this.externalProviderCompanyRepository.findUnique({
            where: { companyId: body?.id },
          });

        if (externalProviderId) {
          await this.stripe.customers.update(externalProviderId, {
            name: body?.name,
            email: body?.billingEmail,
            address: {
              line1: body?.addressLine1,
              line2: body?.addressLine2,
              postal_code: body?.postalCode,
              city: body?.city,
              country: body?.country,
            },
          });
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Subscribe(Topic.COMPANY_TYPE_UPDATED)
  async handleCompanyTypeUpdated(body: CompanyTypeUpdatedEvent): Promise<void> {
    if (!body?.companyId || !body?.newType) {
      return;
    }
    try {
      await this.contractService.handleCompanyTypeChange(body);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
