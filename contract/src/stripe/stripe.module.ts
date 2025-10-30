import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STRIPE_SERVICE',
      useFactory: (configService: ConfigService) =>
        new Stripe(configService.get('STRIPE_API_KEY'), {
          apiVersion: configService.get('STRIPE_API_VERSION') ?? '2023-08-16',
        }),
      inject: [ConfigService],
    },
  ],
  exports: ['STRIPE_SERVICE'],
})
export class StripeModule {}
