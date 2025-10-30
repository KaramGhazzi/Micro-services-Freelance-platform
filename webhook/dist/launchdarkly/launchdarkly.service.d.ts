import { ConfigService } from '@nestjs/config';
import type { FlagActions } from './flag-actions';
type UpdateHTTPResponse = {
    data: {
        flagKey: string;
        action: FlagActions;
        comment: string;
    } | null;
    error?: {
        message: string;
        code: number;
        props?: Record<string, unknown>;
    };
};
export declare class LaunchDarklyService {
    private readonly configService;
    private logger;
    constructor(configService: ConfigService);
    updateFlag(flagKey: string, action: FlagActions, comment: string): Promise<UpdateHTTPResponse>;
}
export {};
