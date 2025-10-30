import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { WebhookCacheService } from '../webhook-cache.service';
import { StripeController } from './stripe.controller';

describe('StripeController', () => {
  let controller: StripeController;
  const servicebusMock: Partial<AzureServiceBusClient> = {
    handleMessage: jest.fn(),
  };
  const stripeServiceMock = {};

  beforeEach(async () => {
    const webhookModule: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        WebhookCacheService,
        {
          provide: 'STRIPE_SERVICE',
          useValue: stripeServiceMock,
        },
        {
          provide: Topic.WEBHOOK_SUBSCRIPTION_CREATED,
          useValue: servicebusMock,
        },
        {
          provide: Topic.WEBHOOK_SUBSCRIPTION_DELETED,
          useValue: servicebusMock,
        },
        {
          provide: Topic.WEBHOOK_SUBSCRIPTION_UPDATED,
          useValue: servicebusMock,
        },
        {
          provide: Topic.WEBHOOK_SUBSCRIPTION_SCHEDULE_CREATED,
          useValue: servicebusMock,
        },
        {
          provide: Topic.WEBHOOK_PAYMENT_SUCCEEDED,
          useValue: servicebusMock,
        },
        {
          provide: Topic.WEBHOOK_PAYMENT_FAILED,
          useValue: servicebusMock,
        },
        {
          provide: Topic.WEBHOOK_PAYMENT_CANCELED,
          useValue: servicebusMock,
        },
        {
          provide: Topic.WEBHOOK_INVOICE_PAID,
          useValue: servicebusMock,
        },
      ],
      controllers: [StripeController],
    }).compile();

    controller = webhookModule.get<StripeController>(StripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
