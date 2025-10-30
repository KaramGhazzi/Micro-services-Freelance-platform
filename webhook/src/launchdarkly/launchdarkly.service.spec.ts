import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { LaunchDarklyService } from './launchdarkly.service';
import { FlagActions } from './flag-actions';

// Mock out all top level functions, such as get, put, delete and post:
jest.mock('axios');

// Mock the config service
const mockConfigService = (configs: Record<string, string>) =>
  ({
    get: jest.fn((key: string) => {
      // Return appropriate value when variable is requested
      if (key in configs) {
        return configs[key];
      }
      throw new Error(`Unexpected key: ${key}`);
    }),
  } as unknown as ConfigService);

describe('LaunchDarklyService', () => {
  describe('updateFlag', () => {
    it('should call axios with correct url, body and headers', async () => {
      const service = new LaunchDarklyService(
        mockConfigService({
          LAUNCH_DARKLY_ACCESS_TOKEN: 'accessToken',
          LAUNCH_DARKLY_ENVIRONMENT_KEY: 'envKey',
        })
      );
      await service.updateFlag(
        'testFlag',
        FlagActions.TURN_FLAG_OFF,
        'run with jest'
      );
      expect(axios.patch).toBeCalledWith(
        'https://app.launchdarkly.com/api/v2/flags/default/testFlag?ignoreConflicts=true',
        {
          comment: 'run with jest',
          environmentKey: 'envKey',
          instructions: [
            {
              kind: FlagActions.TURN_FLAG_OFF,
            },
          ],
        },
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'accessToken',
          }),
        })
      );
    });

    it('should return an object reflecting the new state on success', async () => {
      axios.patch.mockResolvedValueOnce({ data: { message: 'success' } }); // We don't process the actual response, so actual data doesn't matter

      const service = new LaunchDarklyService(
        mockConfigService({
          LAUNCH_DARKLY_ACCESS_TOKEN: 'accessToken',
          LAUNCH_DARKLY_ENVIRONMENT_KEY: 'envKey',
        })
      );
      const result = await service.updateFlag(
        'testFlag',
        FlagActions.TURN_FLAG_OFF,
        'run with jest'
      );

      expect(result).toEqual({
        data: {
          flagKey: 'testFlag',
          action: FlagActions.TURN_FLAG_OFF,
          comment: 'run with jest',
        },
      });
    });

    it('should throw when axios throws an error', async () => {
      const errorMessage = 'Network Error';

      axios.patch.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      const service = new LaunchDarklyService(
        mockConfigService({
          LAUNCH_DARKLY_ACCESS_TOKEN: 'accessToken',
          LAUNCH_DARKLY_ENVIRONMENT_KEY: 'envKey',
        })
      );

      expect(async () => {
        await service.updateFlag(
          'testFlag',
          FlagActions.TURN_FLAG_OFF,
          'run with jest'
        );
      }).rejects.toThrow();
    });
  });
});
