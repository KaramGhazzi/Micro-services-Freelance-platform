import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import type { EventType } from '../src/stripe/stripe.controller';
import { WebhookCacheService } from '../src/webhook-cache.service';

describe('Webhook service', () => {
  let app: INestApplication;
  const stripeServiceMock = {
    webhooks: {
      constructEvent: jest.fn(
        (): undefined | { type: EventType; data: { object } } => undefined
      ),
    },
  };
  const webhookCacheServiceMock = {
    get: jest.fn(() => {}),
    set: jest.fn(() => {}),
  };

  beforeAll(async () => {
    const webhookModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WebhookCacheService)
      .useValue(webhookCacheServiceMock)
      .overrideProvider('STRIPE_SERVICE')
      .useValue(stripeServiceMock)
      .compile();

    app = webhookModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('receives a 404 Not Found', async () => {
    await request(app.getHttpServer()).post('/webhook').send({}).expect(404);
  });

  it('receives a 400 Bad request', async () => {
    await request(app.getHttpServer())
      .post('/webhook/stripe')
      .send({
        rawData: {},
      })
      .expect(400);
  });

  it('receives a 201 created', async () => {
    stripeServiceMock.webhooks.constructEvent.mockReturnValueOnce({
      type: EventType.SUBSCRIPTION_CREATED,
      data: {
        object: undefined,
      },
    });

    await request(app.getHttpServer())
      .post('/webhook/stripe')
      .send({
        rawData: {},
      })
      .expect(201);
  });
});
