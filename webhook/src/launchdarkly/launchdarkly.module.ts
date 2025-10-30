import { Module } from '@nestjs/common';
import { FeatureFlagModule } from '@package/feature-flag';
import { LaunchDarklyService } from './launchdarkly.service';
import { LaunchDarklyController } from './launchdarkly.controller';

@Module({
  imports: [
    FeatureFlagModule.forRoot({
      sdkKey: process.env.LAUNCH_DARKLY_SDK_KEY,
      id: 'webhook',
    }),
  ],
  providers: [LaunchDarklyService],
  controllers: [LaunchDarklyController],
})
export class LaunchDarklyModule {}
