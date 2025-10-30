/* eslint-disable dot-notation */
import { Test, TestingModule } from '@nestjs/testing';
import { ContractService } from '../contract/contract.service';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';
import { ExternalProviderCompanyService } from '../external-provider-company/external-provider-company.service';
import { PlanRepository } from '../plan/plan.repository';
import * as encryptionUtils from '../utils/encryption';
import { getEncryption } from '../utils/encryption';
import { CheckoutInvoiceService } from './checkout-invoice.service';

describe('CheckoutInvoiceService', () => {
  let service: CheckoutInvoiceService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStripe: any;
  let mockContractService: Partial<ContractService>;
  let mockPlanRepository: Partial<PlanRepository> & {
    findUniqueOrThrow: jest.Mock;
  };
  let mockExternalProviderCompanyRepository: Partial<ExternalProviderCompanyRepository> & {
    findUnique: jest.Mock;
  };
  let mockExternalProviderCompanyService: Partial<ExternalProviderCompanyService> & {
    createCustomer: jest.Mock;
  };

  beforeEach(async () => {
    mockStripe = {
      customers: {
        retrieve: jest.fn(),
      },
      invoices: {
        create: jest.fn(),
        sendInvoice: jest.fn(),
        retrieve: jest.fn(),
      },
      invoiceItems: {
        create: jest.fn(),
      },
    };

    mockContractService = {
      createTopAssignmentContract: jest.fn(),
    };

    mockPlanRepository = {
      findUniqueOrThrow: jest.fn(),
    };

    mockExternalProviderCompanyRepository = {
      findUnique: jest.fn(),
      create: jest.fn(),
    };

    mockExternalProviderCompanyService = {
      createCustomer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutInvoiceService,
        { provide: 'STRIPE_SERVICE', useValue: mockStripe },
        { provide: ContractService, useValue: mockContractService },
        { provide: PlanRepository, useValue: mockPlanRepository },
        {
          provide: ExternalProviderCompanyRepository,
          useValue: mockExternalProviderCompanyRepository,
        },
        {
          provide: ExternalProviderCompanyService,
          useValue: mockExternalProviderCompanyService,
        },
      ],
    }).compile();

    service = module.get<CheckoutInvoiceService>(CheckoutInvoiceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let mockEncrypt: jest.Mock;

    beforeEach(() => {
      mockEncrypt = jest.fn().mockReturnValue('mocked-encrypted-token');
      jest.spyOn(encryptionUtils, 'getEncryption').mockReturnValue({
        encrypt: mockEncrypt,
        decrypt: jest.fn(),
      } as unknown as encryptionUtils.Encryption);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should create a checkout invoice successfully', async () => {
      const mockPlan = { id: 1, externalProviderId: 'price_123' };
      const mockCompany = { companyId: 1, externalProviderId: 'cus_123' };
      const mockStripeCustomer = { id: 'cus_123', deleted: false };
      const mockInvoice = { id: 'inv_123' };
      const expectedToken = 'mocked-encrypted-token';

      mockPlanRepository.findUniqueOrThrow.mockResolvedValue(mockPlan);
      mockExternalProviderCompanyRepository.findUnique.mockResolvedValue(
        mockCompany
      );
      mockStripe.customers.retrieve.mockResolvedValue(mockStripeCustomer);
      mockStripe.invoices.create.mockResolvedValue(mockInvoice);
      mockStripe.invoiceItems.create.mockResolvedValue({});
      mockStripe.invoices.sendInvoice.mockResolvedValue(mockInvoice);

      const result = await service.create({
        checkoutInvoiceCreateInput: { planId: 1, quantity: 1 },
        currentCompanyId: 1,
      });

      expect(result).toEqual({ isSuccessful: true, token: expectedToken });
      expect(
        mockContractService.createTopAssignmentContract
      ).toHaveBeenCalled();
    });

    it('should throw an error if customer retrieval fails', async () => {
      const mockPlan = { id: 1, externalProviderId: 'price_123' };
      const mockCompany = { companyId: 1, externalProviderId: 'cus_123' };

      mockPlanRepository.findUniqueOrThrow.mockResolvedValue(mockPlan);
      mockExternalProviderCompanyRepository.findUnique.mockResolvedValue(
        mockCompany
      );
      mockStripe.customers.retrieve.mockResolvedValue(null);

      await expect(
        service.create({
          checkoutInvoiceCreateInput: { planId: 1, quantity: 1 },
          currentCompanyId: 1,
        })
      ).rejects.toThrow('Failed to retrieve customer from external provider');
    });

    it('should create a new customer if externalProviderId is missing', async () => {
      const mockPlan = { id: 1, externalProviderId: 'price_123' };
      const mockCompany = { companyId: 1, externalProviderId: null };
      const mockNewCustomer = { id: 'cus_new' };
      const mockStripeCustomer = { id: 'cus_new', deleted: false };
      const mockInvoice = { id: 'inv_123', created: 1625097600 };
      const expectedToken = 'mocked-encrypted-token';

      mockPlanRepository.findUniqueOrThrow.mockResolvedValue(mockPlan);
      mockExternalProviderCompanyRepository.findUnique.mockResolvedValue(
        mockCompany
      );
      mockExternalProviderCompanyService.createCustomer.mockResolvedValue(
        mockNewCustomer
      );
      mockStripe.customers.retrieve.mockResolvedValue(mockStripeCustomer);
      mockStripe.invoices.create.mockResolvedValue(mockInvoice);
      mockStripe.invoiceItems.create.mockResolvedValue({});
      mockStripe.invoices.sendInvoice.mockResolvedValue(mockInvoice);

      const result = await service.create({
        checkoutInvoiceCreateInput: { planId: 1, quantity: 1 },
        currentCompanyId: 1,
      });

      expect(result).toEqual({ isSuccessful: true, token: expectedToken });
      expect(
        mockExternalProviderCompanyService.createCustomer
      ).toHaveBeenCalled();
    });
  });

  describe('getExternalSyncedPlan', () => {
    it('should return a synced plan', async () => {
      const mockPlan = { id: 1, externalProviderSync: true };
      mockPlanRepository.findUniqueOrThrow.mockResolvedValue(mockPlan);

      const result = await service['getExternalSyncedPlan'](1);
      expect(result).toEqual(mockPlan);
    });

    it('should throw an error for non-synced plan', async () => {
      mockPlanRepository.findUniqueOrThrow.mockRejectedValue(
        new Error('Plan not found')
      );

      await expect(service['getExternalSyncedPlan'](1)).rejects.toThrow(
        'Plan not found'
      );
    });
  });

  describe('getCheckoutInvoiceByToken', () => {
    it('should retrieve and return invoice details', async () => {
      const invoiceId = 'inv_123';
      const mockCompanyId = 123;
      const mockToken = getEncryption().encrypt(
        `${invoiceId}:${mockCompanyId}`
      );
      const mockStripeInvoice = {
        id: invoiceId,
        total: 1000,
        tax: 100,
        currency: 'eur',
        lines: {
          data: [
            {
              description: 'Test Product',
              quantity: 1,
              price: {
                id: 'price_123',
                product: 'prod_123',
              },
            },
          ],
        },
      };

      mockStripe.invoices.retrieve.mockResolvedValue(mockStripeInvoice);

      const result = await service.getCheckoutInvoiceByToken({
        token: mockToken,
        companyId: mockCompanyId,
      });

      expect(mockStripe.invoices.retrieve).toHaveBeenCalledWith(invoiceId);
      expect(result).toEqual({
        invoiceId,
        value: 1000,
        tax: 100,
        currency: 'eur',
        itemName: 'Test Product',
        quantity: 1,
        itemId: 'price_123',
        productId: 'prod_123',
      });
    });

    it('should throw an error for unauthorized access', async () => {
      const invoiceId = 'inv_123';
      const mockCompanyId = 123;
      const mockToken = getEncryption().encrypt(
        `${invoiceId}:${mockCompanyId}`
      );

      await expect(
        service.getCheckoutInvoiceByToken({
          token: mockToken,
          companyId: 456,
        })
      ).rejects.toThrow('Unauthorized access');
    });

    it('should throw an error for invalid invoice data', async () => {
      const invoiceId = 'inv_123';
      const mockCompanyId = 123;
      const mockToken = getEncryption().encrypt(
        `${invoiceId}:${mockCompanyId}`
      );

      const mockInvalidInvoice = { lines: { data: [] } };
      mockStripe.invoices.retrieve.mockResolvedValue(mockInvalidInvoice);

      await expect(
        service.getCheckoutInvoiceByToken({
          token: mockToken,
          companyId: mockCompanyId,
        })
      ).rejects.toThrow('Invalid invoice data');
    });

    it('should handle Stripe API errors', async () => {
      const invoiceId = 'inv_123';
      const mockCompanyId = 123;
      const mockToken = getEncryption().encrypt(
        `${invoiceId}:${mockCompanyId}`
      );

      mockStripe.invoices.retrieve.mockRejectedValue(
        new Error('Stripe API error')
      );

      await expect(
        service.getCheckoutInvoiceByToken({
          token: mockToken,
          companyId: mockCompanyId,
        })
      ).rejects.toThrow('Failed to retrieve invoice: Stripe API error');
    });
  });
});
