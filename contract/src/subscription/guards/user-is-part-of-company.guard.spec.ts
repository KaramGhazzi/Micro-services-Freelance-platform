import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { UserRole } from '@package/types/dist/class-validator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Contract } from '@freelance/contract/client';
import { SubscriptionUserIsPartOfCompanyGuard } from './user-is-part-of-company.guard';
import { ContractRepository } from '../../contract/contract.repository';

describe('SubscriptionUserIsPartOfCompanyGuard', () => {
  let guard: SubscriptionUserIsPartOfCompanyGuard;
  let contractRepository: Partial<ContractRepository>;

  beforeEach(async () => {
    contractRepository = {
      findUnique: jest.fn(),
    };

    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionUserIsPartOfCompanyGuard,
        {
          provide: ContractRepository,
          useValue: contractRepository,
        },
      ],
    }).compile();

    guard = testingModule.get<SubscriptionUserIsPartOfCompanyGuard>(
      SubscriptionUserIsPartOfCompanyGuard
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
      .spyOn(contractRepository, 'findUnique')
      .mockResolvedValue({ companyId: 123 } as Contract);

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
      .spyOn(contractRepository, 'findUnique')
      .mockResolvedValue({ companyId: 234 } as Contract);

    // Call the canActivate method
    const result = await guard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should return false when users x-company-id cannot be converted to a number', async () => {
    const authorization = 'Bearer validToken.';
    const companyId = '123a';
    const blobName = 'blobName';

    const req = {
      headers: {
        authorization,
        'x-company-id': companyId,
      },
      user: {
        id: 1,
        role: UserRole.USER,
        userCompanies: [{ companyId: 234 }],
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
      .spyOn(contractRepository, 'findUnique')
      .mockResolvedValue({ companyId: 234 } as Contract);

    // Call the canActivate method
    const result = await guard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should return false when users x-company-id does not match a company in userCompanies', async () => {
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
        userCompanies: [{ companyId: 234 }],
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
      .spyOn(contractRepository, 'findUnique')
      .mockResolvedValue({ companyId: 234 } as Contract);

    // Call the canActivate method
    const result = await guard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should return true when user is admin of resource but not owner', async () => {
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
        role: UserRole.ADMIN,
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
      .spyOn(contractRepository, 'findUnique')
      .mockResolvedValue({ companyId: 234 } as Contract);

    // Call the canActivate method
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });
});
