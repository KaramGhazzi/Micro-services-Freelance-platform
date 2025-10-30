import { Inject, Injectable, Logger } from '@nestjs/common';
import type Stripe from 'stripe';
import { Plan } from '../../types/graphql/@generated';
import { ContractService } from '../contract/contract.service';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';
import { ExternalProviderCompanyService } from '../external-provider-company/external-provider-company.service';
import { PlanRepository } from '../plan/plan.repository';
import { getEncryption } from '../utils/encryption';
import { CheckoutInvoiceCreateInput } from './dto/create-checkout-invoice.input';
import { CheckoutInvoiceDetails } from './entities/checkout-invoice.entity';

@Injectable()
export class CheckoutInvoiceService {
  private readonly logger = new Logger(CheckoutInvoiceService.name);

  constructor(
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    private readonly contractService: ContractService,
    private readonly planRepository: PlanRepository,
    private readonly externalProviderCompanyRepository: ExternalProviderCompanyRepository,
    private readonly externalProviderCompanyService: ExternalProviderCompanyService
  ) {}

  private async getExternalSyncedPlan(planId: number): Promise<Plan> {
    return this.planRepository.findUniqueOrThrow({
      where: { id: planId, externalProviderSync: true },
    });
  }

  async create({
    checkoutInvoiceCreateInput,
    currentCompanyId,
  }: {
    checkoutInvoiceCreateInput: CheckoutInvoiceCreateInput;
    currentCompanyId: number;
  }) {
    const { planId, quantity } = checkoutInvoiceCreateInput;

    const plan = await this.getExternalSyncedPlan(planId);

    try {
      const externalProviderCompany =
        await this.getOrCreateExternalProviderCompany(currentCompanyId);

      const stripeCustomer = await this.ensureCustomerExists(
        externalProviderCompany
      );

      const sentInvoice = await this.createPayLaterInvoice(
        stripeCustomer.id,
        plan.externalProviderId,
        quantity
      );

      const token = this.generateInvoiceToken(sentInvoice.id, currentCompanyId);

      await this.createContractForInvoice(
        planId,
        currentCompanyId,
        sentInvoice
      );

      // Send the invoice to the customer, when all previous steps are successful.
      // If error is thrown before, the invoice will not be sent and stay in draft mode.
      await this.stripe.invoices.sendInvoice(sentInvoice.id);

      // Return status to frontend, success or failure.
      return {
        isSuccessful: true,
        token,
      };
    } catch (error) {
      throw new Error(
        `Failed to process external provider company: ${error.message}`
      );
    }
  }

  private async ensureCustomerExists(externalProviderCompany: {
    companyId: number;
    externalProviderId: string | null;
  }) {
    let customerId = externalProviderCompany.externalProviderId;

    if (!customerId) {
      const customer = await this.externalProviderCompanyService.createCustomer(
        externalProviderCompany
      );
      customerId = customer.id;
    }

    const stripeCustomer = await this.stripe.customers.retrieve(customerId);

    if (!stripeCustomer || stripeCustomer.deleted) {
      throw new Error(
        `Failed to retrieve customer from external provider: ${externalProviderCompany.externalProviderId}`
      );
    }

    return stripeCustomer as Stripe.Customer;
  }

  /**
   * Generates a token for the invoice.
   *
   * This function creates an encrypted token that combines the invoice ID and company ID.
   * The token is used to securely identify and retrieve the invoice in the frontend,
   * particularly for the confirmation page in the Pay Later flow.
   *
   * @param invoiceId - The ID of the created invoice
   * @param companyId - The ID of the company associated with the invoice
   * @returns An encrypted string token
   */
  // eslint-disable-next-line class-methods-use-this
  private generateInvoiceToken(invoiceId: string, companyId: number): string {
    return getEncryption().encrypt(`${invoiceId}:${companyId}`);
  }

  /**
   * Creates a contract for the given invoice.
   *
   * This function generates a contract based on the provided invoice details.
   * It calculates the end date as one year from the invoice creation date,
   * and then creates a top assignment contract using the ContractService.
   *
   * @param planId - The ID of the plan associated with the contract
   * @param companyId - The ID of the company for which the contract is created
   * @param invoice - The Stripe invoice object containing creation details
   * @returns A Promise that resolves when the contract is created
   */
  private async createContractForInvoice(
    planId: number,
    companyId: number,
    invoice: Stripe.Invoice
  ) {
    const endDate = new Date(invoice.created * 1000);
    endDate.setFullYear(endDate.getFullYear() + 1);

    await this.contractService.createTopAssignmentContract(
      planId,
      companyId,
      null,
      endDate,
      invoice.id
    );
  }

  /**
   * Retrieves checkout invoice details using a token.
   *
   * This function decrypts the provided token to extract the invoice ID and company ID.
   * It then verifies the company ID, retrieves the invoice from Stripe, and returns
   * the relevant invoice details.
   *
   * @param token - An encrypted string containing the invoice ID and company ID
   * @param companyId - The ID of the company requesting the invoice details
   * @returns A Promise that resolves to CheckoutInvoiceDetails
   * @throws Error if unauthorized access, invalid invoice data, or retrieval fails
   */
  async getCheckoutInvoiceByToken({
    token,
    companyId,
  }: {
    token: string;
    companyId: number;
  }): Promise<CheckoutInvoiceDetails> {
    try {
      const decrypted = getEncryption().decrypt(token);
      const [invoiceId, invoiceCompanyId] = decrypted.split(':');

      if (Number(invoiceCompanyId) !== companyId) {
        throw new Error('Unauthorized access');
      }

      const stripeInvoice = await this.stripe.invoices.retrieve(invoiceId);
      if (!stripeInvoice || !stripeInvoice.lines.data.length) {
        throw new Error('Invalid invoice data');
      }

      const { id, total: value, tax, currency } = stripeInvoice;
      const {
        description: itemName,
        quantity,
        price,
      } = stripeInvoice.lines.data[0];

      return {
        invoiceId: id,
        value,
        tax,
        currency,
        itemName,
        quantity,
        itemId: price.id,
        productId: price.product as string,
      };
    } catch (error) {
      this.logger.error(
        `Error retrieving invoice: ${error.message}`,
        error.stack
      );
      throw new Error(`Failed to retrieve invoice: ${error.message}`);
    }
  }

  private async getOrCreateExternalProviderCompany(companyId: number) {
    let company = await this.externalProviderCompanyRepository.findUnique({
      where: { companyId },
    });

    if (!company) {
      company = await this.externalProviderCompanyRepository.create({
        data: { companyId },
      });
    }

    return company;
  }

  private async createPayLaterInvoice(
    customerId: string,
    priceId: string,
    quantity: number
  ): Promise<Stripe.Invoice> {
    try {
      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        collection_method: 'send_invoice',
        days_until_due: 14,
        automatic_tax: { enabled: true },
        metadata: {
          // This metadata field is used to identify invoices that are created by the Pay Later flow,
          // so we can filter them in the webhook events
          isPayLaterFlow: 'true',
        },
      });

      await this.stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice.id,
        price: priceId,
        quantity,
      });

      return invoice;
    } catch (error) {
      // Log the error for debugging purposes
      this.logger.error('Error creating invoice with items:', error);

      throw new Error(`Failed to create invoice: ${error.message}`);
    }
  }
}
