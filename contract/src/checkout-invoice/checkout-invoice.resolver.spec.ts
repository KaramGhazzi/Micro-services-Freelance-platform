import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutInvoiceResolver } from './checkout-invoice.resolver';
import { CheckoutInvoiceService } from './checkout-invoice.service';
import { CheckoutInvoiceCreateInput } from './dto/create-checkout-invoice.input';
import { CheckoutInvoice } from './entities/checkout-invoice.entity';

describe('CheckoutInvoiceResolver', () => {
  let resolver: CheckoutInvoiceResolver;
  let service: CheckoutInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutInvoiceResolver,
        {
          provide: CheckoutInvoiceService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CheckoutInvoiceResolver>(CheckoutInvoiceResolver);
    service = module.get<CheckoutInvoiceService>(CheckoutInvoiceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('checkoutInvoiceCreate', () => {
    it('should create a checkout invoice', async () => {
      const currentCompanyId = 1;
      const checkoutInvoiceCreateInput: CheckoutInvoiceCreateInput = {
        planId: 456,
        quantity: 2,
      };
      const expectedResult: CheckoutInvoice = {
        isSuccessful: true,
        token: 'very-long-token',
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

      const result = await resolver.checkoutInvoiceCreate(
        currentCompanyId,
        checkoutInvoiceCreateInput
      );

      expect(service.create).toHaveBeenCalledWith({
        checkoutInvoiceCreateInput,
        currentCompanyId,
      });

      expect(result).toEqual(expectedResult);
    });
  });
});
