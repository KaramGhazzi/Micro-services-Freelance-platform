import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import {
  CoreCompanyGetByIdEvent,
  CoreCompanyGetByIdResponse,
} from '@package/types/dist/events';
import { ExternalProviderCompany } from '../../types/graphql/@generated';
import { ExternalProviderCompanyRepository } from './external-provider-company.repository';

@Injectable()
export class ExternalProviderCompanyService {
  public constructor(
    private readonly companyRepository: ExternalProviderCompanyRepository,

    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,

    @Inject(Topic.CORE_COMPANY_GET_BY_ID)
    private readonly coreCompanyServiceBusClient: AzureServiceBusClient<
      CoreCompanyGetByIdEvent,
      CoreCompanyGetByIdResponse
    >
  ) {}

  async createCustomer(company: ExternalProviderCompany) {
    if (!company) {
      throw new Error('Cannot create Stripe customer if there is no company');
    }

    const { body: coreCompany } =
      await this.coreCompanyServiceBusClient.sendAndReceive({
        payload: {
          body: {
            companyId: company.companyId,
          },
        },
      });

    if (!coreCompany) {
      throw new Error(
        'Cannot create Stripe customer if there is no core company'
      );
    }

    const data: Stripe.CustomerCreateParams = {
      name: coreCompany?.name,
      email: coreCompany?.billingEmail,

      address: {
        line1: coreCompany?.addressLine1,
        line2: coreCompany?.addressLine2,
        postal_code: coreCompany?.postalCode,
        city: coreCompany?.city,
        country: coreCompany?.country,
      },

      metadata: {
        companyId: company?.companyId,
      },
    };

    if (coreCompany?.vatNumber) {
      data.tax_id_data = [
        {
          type: 'eu_vat',
          value: coreCompany?.vatNumber,
        },
      ];
    }

    const customer = await this.stripe.customers.create(data);

    // Update the company with the external provider id
    await this.companyRepository.update({
      where: {
        companyId: company.companyId,
      },
      data: {
        externalProviderId: customer?.id,
      },
    });

    return customer;
  }
}
