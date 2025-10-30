import { Injectable, HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
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
@Injectable()
export class LaunchDarklyService {
  private logger = new Logger(LaunchDarklyService.name);

  constructor(private readonly configService: ConfigService) {}

  async updateFlag(
    flagKey: string,
    action: FlagActions,
    comment: string
  ): Promise<UpdateHTTPResponse> {
    const accessToken = this.configService.get('LAUNCH_DARKLY_ACCESS_TOKEN');
    const environmentKey = this.configService.get(
      'LAUNCH_DARKLY_ENVIRONMENT_KEY'
    );

    const url = `https://app.launchdarkly.com/api/v2/flags/default/${flagKey}?ignoreConflicts=true`;

    const patchData = {
      comment,
      environmentKey: environmentKey,
      instructions: [
        {
          kind: action,
        },
      ],
    };

    try {
      this.logger.log(
        `Webhook LaunchDarkly: Attempting to switch feature flag '${flagKey}' to '${action}'`
      );
      await axios.patch(url, patchData, {
        headers: {
          Authorization: accessToken,
          'content-type':
            'application/json; domain-model=launchdarkly.semanticpatch',
        },
      });
    } catch (e: unknown) {
      this.logger.error(
        'Webhook LaunchDarkly: An error occured updating feature flag',
        e
      );
      if (axios.isAxiosError(e)) {
        throw new HttpException(e.response?.data.message, e.response.status, {
          cause: { code: e.response.data.code },
        });
      }

      throw e;
    }
    this.logger.log(
      `Webhook LaunchDarkly: Succesfully switched feature flag '${flagKey}' to '${action}'`
    );

    return {
      data: {
        flagKey,
        action,
        comment,
      },
    };
  }
}
