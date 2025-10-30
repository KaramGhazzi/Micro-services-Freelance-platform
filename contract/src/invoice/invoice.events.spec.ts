import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import type Stripe from 'stripe';
import { ContractRepository } from '../contract/contract.repository';
import { InvoiceEvents } from './invoice.events';

describe('InvoiceEvents', () => {
  let invoiceEvents: InvoiceEvents;
  let contractRepository: ContractRepository;
  let loggerSpyLog: jest.SpyInstance;
  let loggerSpyWarn: jest.SpyInstance;
  let loggerSpyError: jest.SpyInstance;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceEvents,
        {
          provide: ContractRepository,
          useValue: {
            findFirst: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    invoiceEvents = module.get<InvoiceEvents>(InvoiceEvents);
    contractRepository = module.get<ContractRepository>(ContractRepository);

    loggerSpyLog = jest.spyOn(Logger.prototype, 'log');
    loggerSpyWarn = jest.spyOn(Logger.prototype, 'warn');
    loggerSpyError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(invoiceEvents).toBeDefined();
  });

  describe('handleInvoicePaid', () => {
    const invoiceSubscription = {
      id: 'invoice-id',
      subscription: 'subscription-id',
      payment_intent: 'payment-intent-id',
    } as Stripe.Invoice;

    const invoiceOneTimePayment = {
      id: 'invoice-id',
      subscription: null,
      payment_intent: 'payment-intent-id',
    } as Stripe.Invoice;

    it('should update contract with invoiceId from subscription', async () => {
      const contract = { id: 'contract-id' };
      (contractRepository.findFirst as jest.Mock).mockResolvedValue(contract);

      await invoiceEvents.handleInvoicePaid(invoiceSubscription);

      expect(contractRepository.findFirst).toHaveBeenCalledWith({
        where: {
          externalProviderId: invoiceSubscription.subscription,
        },
      });
      expect(contractRepository.update).toHaveBeenCalledWith({
        where: {
          id: contract.id,
        },
        data: {
          invoiceId: invoiceSubscription.id,
        },
      });

      expect(loggerSpyLog).toHaveBeenCalledTimes(1);
      expect(loggerSpyLog).toHaveBeenCalledWith(
        `Invoice ${invoiceSubscription.id} processed successfully for contract ${contract.id}`
      );
    });

    it('should update contract with invoiceId from one time payment', async () => {
      const contract = { id: 'contract-id' };
      (contractRepository.findFirst as jest.Mock).mockResolvedValue(contract);

      await invoiceEvents.handleInvoicePaid(invoiceOneTimePayment);

      expect(contractRepository.findFirst).toHaveBeenCalledWith({
        where: {
          externalProviderId: invoiceOneTimePayment.payment_intent,
        },
      });
      expect(contractRepository.update).toHaveBeenCalledWith({
        where: {
          id: contract.id,
        },
        data: {
          invoiceId: invoiceOneTimePayment.id,
        },
      });

      expect(loggerSpyLog).toHaveBeenCalledTimes(1);
      expect(loggerSpyLog).toHaveBeenCalledWith(
        `Invoice ${invoiceOneTimePayment.id} processed successfully for contract ${contract.id}`
      );
    });

    it('should log a warning if contract is not found', async () => {
      (contractRepository.findFirst as jest.Mock).mockResolvedValue(null);

      await invoiceEvents.handleInvoicePaid(invoiceSubscription);

      expect(contractRepository.findFirst).toHaveBeenCalledWith({
        where: {
          externalProviderId: invoiceSubscription.subscription,
        },
      });
      expect(loggerSpyWarn).toHaveBeenCalledTimes(1);
      expect(loggerSpyWarn).toHaveBeenCalledWith(
        `Contract not found for invoice:  ${invoiceSubscription.id}`
      );
    });

    it('should log a warning if externalProviderId is not found', async () => {
      const invalidInvoice = { id: 'invoice-id' } as Stripe.Invoice;

      await invoiceEvents.handleInvoicePaid(invalidInvoice);

      expect(loggerSpyWarn).toHaveBeenCalledTimes(1);
      expect(loggerSpyWarn).toHaveBeenCalledWith(
        `ExternalProviderId not found for invoice: ${invalidInvoice.id}`
      );
    });

    it('should log an error if an exception occurs', async () => {
      const error = new Error('Test error');
      (contractRepository.findFirst as jest.Mock).mockRejectedValue(error);

      await invoiceEvents.handleInvoicePaid(invoiceSubscription);

      expect(contractRepository.findFirst).toHaveBeenCalledWith({
        where: {
          externalProviderId: invoiceSubscription.subscription,
        },
      });
      expect(loggerSpyError).toHaveBeenCalledWith(
        `Error processing invoice ${invoiceSubscription.id}: ${error.message}`,
        error
      );
    });
  });
});
