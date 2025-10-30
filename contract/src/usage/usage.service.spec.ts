import { ContractRepository } from '../contract/contract.repository';
import { UsageService } from './usage.service';
import { UsageType } from '../../types/graphql/@generated';

describe('UsageService', () => {
  let contractRepository: Partial<ContractRepository>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Registers object usage', async () => {
    const usageRepository = {
      findFirst: jest.fn(() => null),
      create: jest.fn(),
    };

    const usageService = new UsageService(usageRepository, contractRepository);
    await usageService.handleObjectUsage(1, UsageType.ASSIGNMENT_VIEW, 1);

    expect(usageRepository.create).toHaveBeenCalled();
  });

  it('Doesn\t register object usage twice', async () => {
    const usageRepository = {
      findFirst: jest.fn().mockResolvedValue({}),
      create: jest.fn(),
    };

    const usageService = new UsageService(usageRepository, contractRepository);
    await usageService.handleObjectUsage(1, UsageType.ASSIGNMENT_VIEW, 1);

    expect(usageRepository.create).not.toHaveBeenCalled();
  });
});
