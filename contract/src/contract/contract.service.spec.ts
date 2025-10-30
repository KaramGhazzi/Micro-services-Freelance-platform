import { ProductSlug } from '@freelance/contract/client';
import { AuthorizationCacheService } from '@package/authorization';
import { Stripe } from 'stripe';
import { Logger } from '@nestjs/common';
import { CompanyType } from '@package/types/dist/class-validator';
import { ContractUpdatedEvent } from '@package/types';
import { AzureServiceBusClient } from '@package/azure-service-bus';
import { ContractService } from './contract.service';
import { ContractRepository } from './contract.repository';
import { PlanRepository } from '../plan/plan.repository';
import { Contract, Plan } from '../../types/graphql/@generated';
import { CustomContractCreateInput } from '../../types/graphql/contract/create-contract.input';
import { ProductRepository } from '../product/product.repository';

jest.mock('@package/authorization');
jest.mock('@package/azure-service-bus');

describe('ContractService', () => {
  let contractService;
  const warnSpy = jest.spyOn(Logger, 'warn').mockImplementation();
  const errorSpy = jest.spyOn(Logger, 'error').mockImplementation();

  beforeEach(async () => {
    contractService = new ContractService(
      {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
      } as unknown as ContractRepository,
      {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      } as unknown as PlanRepository,
      {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      } as unknown as ProductRepository,
      { customers: { retrieve: jest.fn() } } as unknown as Stripe,
      {} as AuthorizationCacheService,
      {} as AzureServiceBusClient<ContractUpdatedEvent>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createFreelancerProContract', () => {
    it('should warn if plan is not found', async () => {
      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(null);
      await contractService.createFreelancerProContract(1, 2, 3);
      expect(warnSpy).toHaveBeenCalled();
    });

    it('should warn if plan is not a freelancer pro plan', async () => {
      const plan = {
        id: 1,
        product: { slug: 'non-freelancer-pro' },
      } as unknown as Plan;
      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(plan);

      await contractService.createFreelancerProContract(1, 2);
      expect(warnSpy).toHaveBeenCalled();
    });

    it('should warn if existing contract found', async () => {
      const plan = {
        id: 1,
        product: { slug: ProductSlug.FREELANCER_PRO },
      } as unknown as Plan;
      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(plan);
      jest
        .spyOn(contractService.contractRepository, 'findFirst')
        .mockResolvedValueOnce({ id: 1 });
      await contractService.createFreelancerProContract(1, 2);
      expect(contractService.contractRepository.findFirst).toHaveBeenCalled();
      expect(warnSpy).toHaveBeenCalled();
    });

    it('should create a new contract', async () => {
      const plan = {
        id: 1,
        product: { slug: ProductSlug.FREELANCER_PRO },
      } as unknown as Plan;
      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(plan);
      jest
        .spyOn(contractService, 'createContractFromPlan')
        .mockResolvedValueOnce({
          companyId: 2,
        } as Contract);
      jest
        .spyOn(contractService.stripe.customers, 'retrieve')
        .mockResolvedValueOnce({
          email: 'contract@flabbergasted.com',
          name: 'Flabber gast',
        } as unknown as Stripe.Response<Stripe.Customer>);
      jest
        .spyOn(contractService.contractRepository, 'findMany')
        .mockResolvedValueOnce([
          {
            companyId: 2,
            plan: { product: { slug: ProductSlug.FREELANCER_PRO } },
          } as Contract,
        ]);
      await contractService.createFreelancerProContract(1, 2, 3);
      expect(contractService.createContractFromPlan).toHaveBeenCalledWith(
        { id: 1, product: { slug: 'FREELANCER_PRO' } },
        2,
        { externalProviderId: 3 }
      );
    });
  });

  describe('createCustomContract', () => {
    it('should throw an error if plan is not found', async () => {
      const input: CustomContractCreateInput = {
        planId: 1,
        companyId: 1,
        startDate: new Date(),
        endDate: new Date(),
        usageAmount: 100,
        renewalInterval: 'monthly',
      };

      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(null);

      await expect(
        contractService.createCustomContract(input)
      ).rejects.toThrow();
    });

    it('should create a new contract and end the old contract on the new startDate', async () => {
      const startDate = new Date();

      const input: CustomContractCreateInput = {
        planId: 7,
        companyId: 1,
        startDate: new Date(startDate.setMonth(startDate.getMonth() + 1)),
        endDate: new Date(startDate.setMonth(startDate.getMonth() + 2)),
        usageAmount: 100,
        renewalInterval: 'monthly',
      };

      const plan: Plan = {
        id: 7,
        product: { slug: ProductSlug.FREELANCER_PRO },
      } as Plan;

      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(plan);
      jest
        .spyOn(contractService, 'createContractFromPlan')
        .mockResolvedValueOnce({ id: 7 } as Contract);
      jest
        .spyOn(contractService.contractRepository, 'findMany')
        .mockResolvedValueOnce([{ id: 8 } as unknown as Contract]);

      const newContract = await contractService.createCustomContract(input);

      expect(contractService.createContractFromPlan).toHaveBeenCalledWith(
        plan,
        1,
        {
          startDate: input.startDate,
          endDate: input.endDate,
          usageAmount: input.usageAmount,
          renewalInterval: input.renewalInterval,
        }
      );

      expect(contractService.contractRepository.update).toHaveBeenCalledWith({
        where: { id: 8 },
        data: { endDate: input.startDate },
      });

      expect(newContract).toEqual({ success: true });
    });

    it('should only create a company premium contract', async () => {
      const input: CustomContractCreateInput = {
        planId: 9,
        companyId: 1,
        startDate: new Date(),
        endDate: new Date(),
        usageAmount: 100,
        renewalInterval: 'monthly',
      };

      const plan: Plan = {
        id: 9,
        product: { slug: ProductSlug.COMPANY_PREMIUM_PROFILE },
      } as Plan;

      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(plan);
      jest
        .spyOn(contractService, 'createContractFromPlan')
        .mockResolvedValueOnce({ id: 1 } as Contract);

      const newContract = await contractService.createCustomContract(input);
      expect(newContract).toEqual({ success: true });
    });

    it('should handle corresponding market monitor contract correctly', async () => {
      const input: CustomContractCreateInput = {
        planId: 1,
        companyId: 1,
        startDate: new Date(),
        endDate: new Date(),
        usageAmount: 100,
        renewalInterval: 'monthly',
      };

      const plan: Plan = {
        id: 1,
        product: { slug: ProductSlug.MARKETMONITOR_PREMIUM_APPLICATION },
      } as Plan;

      jest
        .spyOn(contractService.planRepository, 'findFirst')
        .mockResolvedValueOnce(plan);
      jest
        .spyOn(contractService, 'handleMarketMonitorContracts')
        .mockResolvedValueOnce(undefined);

      const newContract = await contractService.createCustomContract(input);

      expect(contractService.handleMarketMonitorContracts).toHaveBeenCalledWith(
        1,
        {
          startDate: input.startDate,
          endDate: input.endDate,
          usageAmount: input.usageAmount,
          renewalInterval: input.renewalInterval,
        }
      );
      expect(newContract).toEqual({ success: true });
    });
  });

  describe('endProContracts', () => {
    it('should warn and return isSuccessful false if no plans are found', async () => {
      jest
        .spyOn(contractService.contractRepository, 'findMany')
        .mockResolvedValueOnce([]); // No freelancer contracts
      jest
        .spyOn(contractService.planRepository, 'findMany')
        .mockResolvedValueOnce([]); // No basic plans

      const result = await contractService.endProContracts(
        1,
        '2023-01-01',
        '2023-02-01'
      );
      expect(warnSpy).toHaveBeenCalledWith(
        'Freelancer plans or Basic plans not found'
      );
      expect(result).toEqual({ isSuccessful: false });
    });

    it('should update existing contracts and create new ones if plans are found', async () => {
      const freelancerContracts = [{ id: 1 }];
      const basicPlans = [
        { id: 2, product: { slug: ProductSlug.COMPANY_BASIC } },
      ];

      jest
        .spyOn(contractService.contractRepository, 'findMany')
        .mockResolvedValueOnce(freelancerContracts);
      jest
        .spyOn(contractService.planRepository, 'findMany')
        .mockResolvedValueOnce(basicPlans);
      jest
        .spyOn(contractService.contractRepository, 'update')
        .mockImplementation(async () => ({}));
      jest
        .spyOn(contractService, 'createContractFromPlan')
        .mockImplementation(async () => ({}));

      const result = await contractService.endProContracts(
        1,
        '2023-01-01',
        '2023-02-01'
      );
      expect(contractService.contractRepository.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { endDate: new Date('2023-01-01') },
      });
      expect(contractService.createContractFromPlan).toHaveBeenCalledWith(
        basicPlans[0],
        1,
        { startDate: new Date('2023-02-01') }
      );
      expect(result).toEqual({ isSuccessful: true });
    });
  });

  describe('handleCompanyTypeChange', () => {
    it('should call changeCompanyTypeToFreelancer when newType is FREELANCER', async () => {
      const body = { newType: CompanyType.FREELANCER, companyId: 1 };

      const changeCompanyTypeToFreelancerSpy = jest
        .spyOn(contractService, 'changeCompanyTypeToFreelancer')
        .mockResolvedValueOnce(body.newType);

      await contractService.handleCompanyTypeChange(body);

      expect(changeCompanyTypeToFreelancerSpy).toHaveBeenCalledWith(1);
    });

    it('should call changeCompanyTypeToOrganisation when newType is not FREELANCER', async () => {
      const body = { newType: CompanyType.CLIENT, companyId: 1 };

      const changeCompanyTypeToOrganisationSpy = jest
        .spyOn(contractService, 'changeCompanyTypeToOrganisation')
        .mockResolvedValueOnce(body.newType);

      await contractService.handleCompanyTypeChange(body);

      expect(changeCompanyTypeToOrganisationSpy).toHaveBeenCalledWith(1);
    });

    it('should log an error if changeCompanyTypeToFreelancer fails', async () => {
      jest
        .spyOn(contractService, 'changeCompanyTypeToFreelancer')
        .mockRejectedValueOnce(new Error('Failed'));

      const body = { newType: CompanyType.FREELANCER, companyId: 1 };

      await contractService.handleCompanyTypeChange(body);

      expect(errorSpy).toHaveBeenCalledWith(
        `Failed to change company type for company ${body.companyId}`
      );
    });

    it('should log an error if changeCompanyTypeToOrganisation fails', async () => {
      jest
        .spyOn(contractService, 'changeCompanyTypeToOrganisation')
        .mockRejectedValueOnce(new Error('Failed'));

      const body = { newType: CompanyType.CLIENT, companyId: 1 };

      await contractService.handleCompanyTypeChange(body);

      expect(errorSpy).toHaveBeenCalledWith(
        `Failed to change company type for company ${body.companyId}`
      );
    });
  });

  describe('updateContract', () => {
    it('should warn if contract is not found', async () => {
      jest
        .spyOn(contractService.contractRepository, 'findUnique')
        .mockResolvedValueOnce(null); // No contract found

      const result = await contractService.updateContract(3, 2);

      expect(warnSpy).toHaveBeenCalledWith('Contract not found');
      expect(result).toEqual({ isSuccess: false });
    });

    it('should update contract and return success', async () => {
      const existingContract = {
        id: 1,
        plan: { product: { slug: 'FREELANCER_PRO' } },
      };

      const updatedContract = { ...existingContract, usageAmount: 200 }; // Mock updated contract

      jest
        .spyOn(contractService.contractRepository, 'findUnique')
        .mockResolvedValueOnce(existingContract); // Contract found
      jest
        .spyOn(contractService.contractRepository, 'update')
        .mockResolvedValueOnce(updatedContract); // Contract update succeeds

      const result = await contractService.updateContract(1, 1, {
        usageAmount: 200,
      });

      expect(contractService.contractRepository.update).toHaveBeenCalledWith({
        where: { id: 1, companyId: 1 },
        data: {
          startDate: expect.any(Date),
          endDate: null,
          usageType: undefined,
          usageAmount: 200,
          usageInterval: undefined,
          renewalInterval: undefined,
        },
      });

      expect(result).toEqual({ isSuccess: true });
    });

    it('should return failure if contract update fails', async () => {
      const existingContract = {
        id: 1,
        plan: { product: { slug: 'FREELANCER_PRO' } },
      }; // Mock existing contract

      jest
        .spyOn(contractService.contractRepository, 'findUnique')
        .mockResolvedValueOnce(existingContract); // Contract found
      jest
        .spyOn(contractService.contractRepository, 'update')
        .mockResolvedValueOnce(null); // Contract update fails

      const result = await contractService.updateContract(1, 1, {
        usageAmount: 200,
      });

      expect(contractService.contractRepository.update).toHaveBeenCalled();
      expect(result).toEqual({ isSuccess: false });
    });
  });
});
