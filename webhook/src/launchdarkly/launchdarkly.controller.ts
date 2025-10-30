import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { LaunchDarklyService } from './launchdarkly.service';
import { FlagActions } from './flag-actions';

@Controller('webhook')
export class LaunchDarklyController {
  constructor(private readonly featureFlagsService: LaunchDarklyService) {}

  @Get('feature-flags/:flagKey/:action')
  async updateFeatureFlag(
    @Param('flagKey') flagKey: string,
    @Param('action', new ParseEnumPipe(FlagActions)) action: FlagActions
  ): Promise<Record<string, unknown>> {
    return this.featureFlagsService.updateFlag(
      flagKey,
      action,
      'Automatically switched by the webhook service.'
    );
  }
}
