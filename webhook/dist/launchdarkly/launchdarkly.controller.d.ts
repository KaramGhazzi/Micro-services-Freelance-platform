import { LaunchDarklyService } from './launchdarkly.service';
import { FlagActions } from './flag-actions';
export declare class LaunchDarklyController {
    private readonly featureFlagsService;
    constructor(featureFlagsService: LaunchDarklyService);
    updateFeatureFlag(flagKey: string, action: FlagActions): Promise<Record<string, unknown>>;
}
