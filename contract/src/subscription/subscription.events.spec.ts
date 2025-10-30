import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionEvents } from './subscription.events';
import { ContractRepository } from '../contract/contract.repository';
import { PlanRepository } from '../plan/plan.repository';
import { ExternalProviderCompanyRepository } from '../external-provider-company/external-provider-company.repository';
import { ContractService } from '../contract/contract.service';

describe('SubscriptionService', () => {
  let handler: SubscriptionEvents;
  let service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ContractRepository,
          useValue: { findMany: jest.fn() },
        },
        {
          provide: PlanRepository,
          useValue: { findFirst: jest.fn() },
        },
        {
          provide: ExternalProviderCompanyRepository,
          useValue: {},
        },
        {
          provide: 'STRIPE_SERVICE',
          useValue: {},
        },
        {
          provide: ContractService,
          useValue: {
            getActiveContractSlugs: jest.fn(),
          },
        },
        SubscriptionEvents,
      ],
    }).compile();

    handler = module.get<SubscriptionEvents>(SubscriptionEvents);
    service = module.get<jest.Mocked<ContractService>>(ContractService);
  });

  it('handles incoming subscription request', async () => {
    service.getActiveContractSlugs.mockResolvedValueOnce(['freelancer-pro']);

    const res = await handler.handleSubscriptionNotification({
      companyId: 1,
    });
    // it should deduce that the active subscription is PRO
    expect(res).toEqual({
      success: true,
      subscriptions: ['freelancer-pro'],
    });
  });

  it('handles missing subscriptions', async () => {
    service.getActiveContractSlugs.mockResolvedValueOnce([]);

    const res = await handler.handleSubscriptionNotification({
      companyId: 1,
    });
    // it should deduce that there are no active subscriptions
    expect(res).toEqual({
      success: false,
      error: 'no-subscriptions',
    });
  });
});
