import * as crypto from 'crypto';
import {
  Controller,
  Logger,
  Inject,
  Post,
  Req,
  RawBodyRequest,
  Headers,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { EmailUnsubscribeEvent, EmailUnsubscribeType } from '@package/types';

@Controller('webhook')
export class HubspotController {
  constructor(
    private configService: ConfigService,
    @Inject(Topic.WEBHOOK_EMAIL_UNSUBSCRIBE)
    private readonly emailUnsubscribeServiceBusClient: AzureServiceBusClient<EmailUnsubscribeEvent>
  ) {
    this.endpointSecret = this.configService.get('HUBSPOT_ENDPOINT_SECRET');
  }

  private endpointSecret: string;
  private logger = new Logger(HubspotController.name);
  private hashAlgorithm = 'sha256';

  @Post('/hubspot')
  async handleWebhook(
    @Headers() headers: HeadersInit,
    @Req() request: RawBodyRequest<Request>
  ) {
    const timestamp = Number(headers['x-hubspot-request-timestamp']);
    const time = new Date();
    const fiveMinutes = 300000;

    if (time.getTime() - timestamp >= fiveMinutes) {
      this.logger.error('Webhook received request that was too old');
      throw new BadRequestException();
    }

    const rawBody = request.rawBody;
    const signature = Buffer.from(
      headers['x-hubspot-signature-v3'] || '',
      'utf-8'
    );

    const host = headers['host'];
    const url = `https://${host}${request.url}`;
    const hmac = crypto.createHmac(this.hashAlgorithm, this.endpointSecret);

    const source = `POST${url}${rawBody}${timestamp}`;
    const digest = Buffer.from(hmac.update(source).digest('base64'));

    console.log('digest', digest.toString());

    const isAllowed =
      signature.length === digest.length &&
      crypto.timingSafeEqual(digest, signature);
    if (!isAllowed) {
      throw new UnauthorizedException('Someone is doing something nasty');
    }

    let event = JSON.parse(rawBody.toString());
    if (!event) {
      const message = `Webhook empty event Error`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    if (!Object.values(EmailUnsubscribeType).includes(event.type)) {
      const message = `Unhandled event type ${event?.type}`;
      this.logger.error(message);
      // Do not return BadRequestException(400) in this case,
      // because if hubspot receives a 400 it will retry the webhook request.
      return message;
    }

    this.handleEmailUnsubscribe(event);
    return 'Webhook received successfully';
  }

  async handleEmailUnsubscribe(event: EmailUnsubscribeEvent) {
    if (!event?.userId) {
      return;
    }

    const payload = {
      body: {
        ...event,
      },
    };

    await this.emailUnsubscribeServiceBusClient.emit({
      payload,
      options: {},
    });
  }
}
