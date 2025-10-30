import {
  Controller,
  Logger,
  Inject,
  Post,
  Req,
  RawBodyRequest,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';

import { Stripe } from 'stripe';
import { WebhookCacheService } from '../webhook-cache.service';

const EventType = {
  INVOICE_PAID: 'invoice.paid',
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_SCHEDULE_CREATED: 'customer.subscription_schedule.created',
  SUBSCRIPTION_SCHEDULE_DELETED: 'customer.subscription_schedule.deleted',
  PAYMENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_FAILED: 'payment_intent.payment_failed',
  PAYMENT_CANCELED: 'payment_intent.canceled',
} satisfies Record<string, string>;

export type EventType = (typeof EventType)[keyof typeof EventType];

type EventHandlers = {
  [K in EventType]: (event: Stripe.Event) => Promise<void>;
};

@Controller('webhook')
export class StripeController {
  private endpointSecret: string;
  private logger = new Logger(StripeController.name);

  constructor(
    private configService: ConfigService,
    private webhookCacheService: WebhookCacheService,
    @Inject('STRIPE_SERVICE')
    private readonly stripe: Stripe,
    @Inject(Topic.WEBHOOK_SUBSCRIPTION_CREATED)
    private readonly subscriptionCreatedServiceBusClient: AzureServiceBusClient<Stripe.Subscription>,
    @Inject(Topic.WEBHOOK_SUBSCRIPTION_DELETED)
    private readonly subscriptionDeletedServiceBusClient: AzureServiceBusClient<Stripe.Subscription>,
    @Inject(Topic.WEBHOOK_SUBSCRIPTION_UPDATED)
    private readonly subscriptionUpdatedServiceBusClient: AzureServiceBusClient<Stripe.Subscription>,
    @Inject(Topic.WEBHOOK_SUBSCRIPTION_SCHEDULE_CREATED)
    private readonly subscriptionScheduleCreatedServiceBusClient: AzureServiceBusClient<Stripe.SubscriptionSchedule>,
    @Inject(Topic.WEBHOOK_PAYMENT_SUCCEEDED)
    private readonly paymentSucceededServiceBusClient: AzureServiceBusClient<Stripe.PaymentIntent>,
    @Inject(Topic.WEBHOOK_PAYMENT_FAILED)
    private readonly paymentFailedServiceBusClient: AzureServiceBusClient<Stripe.PaymentIntent>,
    @Inject(Topic.WEBHOOK_PAYMENT_CANCELED)
    private readonly paymentCanceledServiceBusClient: AzureServiceBusClient<Stripe.PaymentIntent>,
    @Inject(Topic.WEBHOOK_INVOICE_PAID)
    private readonly invoicePaidServiceBusClient: AzureServiceBusClient<Stripe.Invoice>
  ) {
    this.endpointSecret = this.configService.get('STRIPE_ENDPOINT_SECRET');
  }

  @Post('/stripe')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>
  ) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        this.endpointSecret
      );
    } catch (err) {
      const message = `Webhook Error: ${err.message}`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    if (!event?.data?.object) {
      this.logger.error('Webhook contains no object', request.rawBody);
      throw new BadRequestException('Invalid event data');
    }

    if (!Object.values(EventType).includes(event.type as EventType)) {
      const message = `Unhandled event type ${event?.type}`;
      this.logger.warn(message);
      // Do not return BadRequestException(400) in this case,
      // because if stripe receives a 400 it will retry the webhook request.
      return message;
    }

    if (await this.webhookCacheService.get(event.id)) {
      return `Webhook ${event.type} with id ${event.id} already processed`;
    }
    await this.webhookCacheService.set(event.id);

    try {
      await this.processEvent(event);
      this.logger.debug(
        `Processed ${event.type} event: ${JSON.stringify(event.data.object)}`
      );
    } catch (error) {
      this.logger.error(
        `Error processing event ${event.type}: ${error.message}`,
        error.stack
      );
      throw new BadRequestException('Error processing webhook');
    }

    return 'Webhook received successfully';
  }

  private isEventType<T extends EventType>(
    event: Stripe.Event,
    type: T
  ): event is Stripe.Event & { type: T } {
    return event.type === type;
  }

  private eventHandlers: EventHandlers = {
    [EventType.SUBSCRIPTION_CREATED]: (event) => {
      if (this.isEventType(event, EventType.SUBSCRIPTION_CREATED)) {
        return this.handleSubscriptionCreated(event);
      }
    },
    [EventType.SUBSCRIPTION_DELETED]: (event) => {
      if (this.isEventType(event, EventType.SUBSCRIPTION_DELETED)) {
        return this.handleSubscriptionDeleted(event);
      }
    },
    [EventType.SUBSCRIPTION_UPDATED]: (event) => {
      if (this.isEventType(event, EventType.SUBSCRIPTION_UPDATED)) {
        return this.handleSubscriptionUpdated(event);
      }
    },
    [EventType.SUBSCRIPTION_SCHEDULE_CREATED]: (event) => {
      if (this.isEventType(event, EventType.SUBSCRIPTION_SCHEDULE_CREATED)) {
        return this.handleSubscriptionScheduleCreated(event);
      }
    },
    [EventType.PAYMENT_SUCCEEDED]: (event) => {
      if (this.isEventType(event, EventType.PAYMENT_SUCCEEDED)) {
        return this.handlePaymentSucceeded(event);
      }
    },
    [EventType.PAYMENT_FAILED]: (event) => {
      if (this.isEventType(event, EventType.PAYMENT_FAILED)) {
        return this.handlePaymentFailed(event);
      }
    },
    [EventType.PAYMENT_CANCELED]: (event) => {
      if (this.isEventType(event, EventType.PAYMENT_CANCELED)) {
        return this.handlePaymentCanceled(event);
      }
    },
    [EventType.INVOICE_PAID]: (event) => {
      if (this.isEventType(event, EventType.INVOICE_PAID)) {
        return this.handleInvoicePaid(event);
      }
    },
  };

  private async processEvent(event: Stripe.Event): Promise<void> {
    const handler = this.eventHandlers[event.type as EventType];

    if (handler) {
      await handler(event);
    } else {
      this.logger.warn(`No handler found for event type: ${event.type}`);
    }
  }

  private async handleSubscriptionCreated(
    event: Stripe.Event & { type: typeof EventType.SUBSCRIPTION_CREATED }
  ) {
    const object = event.data.object as Stripe.Subscription;
    await this.subscriptionCreatedServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }
  private async handleSubscriptionDeleted(
    event: Stripe.Event & { type: typeof EventType.SUBSCRIPTION_DELETED }
  ) {
    const object = event.data.object as Stripe.Subscription;
    await this.subscriptionDeletedServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }

  private async handleSubscriptionUpdated(
    event: Stripe.Event & { type: typeof EventType.SUBSCRIPTION_UPDATED }
  ) {
    const object = event.data.object as Stripe.Subscription;
    await this.subscriptionUpdatedServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }

  private async handleSubscriptionScheduleCreated(
    event: Stripe.Event & {
      type: typeof EventType.SUBSCRIPTION_SCHEDULE_CREATED;
    }
  ) {
    const object = event.data.object as Stripe.SubscriptionSchedule;
    await this.subscriptionScheduleCreatedServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }

  private async handlePaymentSucceeded(
    event: Stripe.Event & { type: typeof EventType.PAYMENT_SUCCEEDED }
  ) {
    const object = event.data.object as Stripe.PaymentIntent;
    await this.paymentSucceededServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }

  private async handlePaymentFailed(
    event: Stripe.Event & { type: typeof EventType.PAYMENT_FAILED }
  ) {
    const object = event.data.object as Stripe.PaymentIntent;
    await this.paymentFailedServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }

  private async handlePaymentCanceled(
    event: Stripe.Event & { type: typeof EventType.PAYMENT_CANCELED }
  ) {
    const object = event.data.object as Stripe.PaymentIntent;
    await this.paymentCanceledServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }

  private async handleInvoicePaid(
    event: Stripe.Event & { type: typeof EventType.INVOICE_PAID }
  ) {
    const object = event.data.object as Stripe.Invoice;
    await this.invoicePaidServiceBusClient.emit({
      payload: { body: object },
      options: {},
    });
  }
}
