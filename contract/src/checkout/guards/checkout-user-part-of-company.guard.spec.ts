import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { UserRole } from '@package/types/dist/class-validator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CheckoutUserPartOfCompanyGuard } from './checkout-user-part-of-company.guard';
import { CheckoutService } from '../checkout.service';

type CheckoutReturnType = Awaited<ReturnType<CheckoutService['findByToken']>>;

describe('CheckoutUserPartOfCompanyGuard', () => {
  let guard: CheckoutUserPartOfCompanyGuard;
  let checkoutService: Partial<CheckoutService>;

  beforeEach(async () => {
    checkoutService = {
      findByToken: jest.fn(),
    };

    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutUserPartOfCompanyGuard,
        {
          provide: CheckoutService,
          useValue: checkoutService,
        },
      ],
    }).compile();

    guard = testingModule.get<CheckoutUserPartOfCompanyGuard>(
      CheckoutUserPartOfCompanyGuard
    );
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true when user is part of a company of the resource', async () => {
    const authorization = 'Bearer validToken.';
    const companyId = '123';
    const blobName = 'blobName';

    const req = {
      headers: {
        authorization,
        'x-company-id': companyId,
      },
      user: {
        id: 1,
        role: UserRole.USER,
        userCompanies: [{ companyId: 123 }],
      },
      args: {
        where: {
          token: 'token',
        },
      },
    };

    const context = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue(req),
      getType: jest.fn(),
      getArgs: jest.fn().mockReturnValue([req]),
      getClass: jest.fn(),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    const gqlContext = GqlExecutionContext.create(context);

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(gqlContext);

    gqlContext.getContext = jest.fn().mockReturnValue({ req });
    gqlContext.getArgs = jest.fn().mockReturnValue({ blobName });

    jest
      .spyOn(checkoutService, 'findByToken')
      .mockResolvedValue({ companyId: 123 } as CheckoutReturnType);

    // Call the canActivate method
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should return false when user is not part of a company of the resource', async () => {
    const authorization = 'Bearer validToken.';
    const companyId = '123';
    const blobName = 'blobName';

    const req = {
      headers: {
        authorization,
        'x-company-id': companyId,
      },
      user: {
        id: 1,
        role: UserRole.USER,
        userCompanies: [{ companyId: 123 }],
      },
      args: {
        where: {
          token: 'token',
        },
      },
    };

    const context = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue(req),
      getType: jest.fn(),
      getArgs: jest.fn().mockReturnValue([req]),
      getClass: jest.fn(),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    const gqlContext = GqlExecutionContext.create(context);

    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(gqlContext);

    gqlContext.getContext = jest.fn().mockReturnValue({ req });
    gqlContext.getArgs = jest.fn().mockReturnValue({ blobName });

    jest
      .spyOn(checkoutService, 'findByToken')
      .mockResolvedValue({ companyId: 234 } as CheckoutReturnType);

    // Call the canActivate method
    const result = await guard.canActivate(context);

    expect(result).toBe(false);
  });
});
