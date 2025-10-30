import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { RawBodyRequest, BadRequestException } from '@nestjs/common';
import { HubspotController } from './hubspot.controller';

describe('StripeController', () => {
  let controller: HubspotController;
  let configServiceMock: Partial<ConfigService>;

  const servicebusMock: Partial<AzureServiceBusClient> = {
    handleMessage: jest.fn(),
  };

  beforeEach(async () => {
    configServiceMock = {
      get: jest.fn(() => 'ENDPOINT_SECRET'),
    };

    const webhookModule: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: Topic.WEBHOOK_EMAIL_UNSUBSCRIBE,
          useValue: servicebusMock,
        },
      ],
      controllers: [HubspotController],
    }).compile();

    controller = webhookModule.get<HubspotController>(HubspotController);

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('check if signature verification works', async () => {
    const headers = {
      host: 'https://example.com',
      'x-hubspot-signature-v3': 'P/ZaEPCeCA1ljC4iSgsee0pbn236d7qloUH7HZErEq0=',
      'x-hubspot-request-timestamp': '1712325276489',
    };

    jest.setSystemTime(new Date(1712325276489));

    const request = {
      url: '/webhook/hubspot',
      rawBody: '{"type":"email_unsubscribe_content"}',
    } as unknown as RawBodyRequest<Request>;

    const returnValue = await controller.handleWebhook(headers, request);
    expect(returnValue).toBe('Webhook received successfully');
  });

  it('check if signature verification fails because of timestamp', async () => {
    const fiveMinutes = 300000;
    const headers = {
      host: 'https://example.com',
      'x-hubspot-signature-v3': 'P/ZaEPCeCA1ljC4iSgsee0pbn236d7qloUH7HZErEq0=',
      'x-hubspot-request-timestamp': '1712325276489',
    };

    jest.setSystemTime(new Date(1712325276489 + fiveMinutes));

    const request = {
      url: '/webhook/hubspot',
      rawBody: '{"type":"email_unsubscribe_content"}',
    } as unknown as RawBodyRequest<Request>;

    expect(controller.handleWebhook(headers, request)).rejects.toThrow(
      BadRequestException
    );
  });

  it('check if function returns 200 OK when invalid event has been provided', async () => {
    const headers = {
      host: 'https://example.com',
      'x-hubspot-signature-v3': '7idXS45dv4TbtGJLLuiNfMpe4D2GpMijFxwgNqAVKIs=',
      'x-hubspot-request-timestamp': '1712325276489',
    };

    jest.setSystemTime(new Date(1712325276489));

    const request = {
      url: '/webhook/hubspot',
      rawBody: '{"type":"unknown"}',
    } as unknown as RawBodyRequest<Request>;

    expect(await controller.handleWebhook(headers, request)).toBe(
      'Unhandled event type unknown'
    );
  });
});
