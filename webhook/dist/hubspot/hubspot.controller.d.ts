import { RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureServiceBusClient } from '@package/azure-service-bus';
import { EmailUnsubscribeEvent } from '@package/types';
export declare class HubspotController {
    private configService;
    private readonly emailUnsubscribeServiceBusClient;
    constructor(configService: ConfigService, emailUnsubscribeServiceBusClient: AzureServiceBusClient<EmailUnsubscribeEvent>);
    private endpointSecret;
    private logger;
    private hashAlgorithm;
    handleWebhook(headers: HeadersInit, request: RawBodyRequest<Request>): Promise<string>;
    handleEmailUnsubscribe(event: EmailUnsubscribeEvent): Promise<void>;
}
