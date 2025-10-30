import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { LaunchDarklyController } from './launchdarkly.controller';
import { LaunchDarklyService } from './launchdarkly.service';
import { FlagActions } from './flag-actions';

describe('LaunchDarklyController', () => {
  let controller: LaunchDarklyController;
  let service: LaunchDarklyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LaunchDarklyController],
      providers: [ConfigService, LaunchDarklyService],
    }).compile();

    service = moduleRef.get<LaunchDarklyService>(LaunchDarklyService);
    controller = moduleRef.get<LaunchDarklyController>(LaunchDarklyController);
  });

  it('should call the service with the parameters passed to the controller', async () => {
    const serviceSpy = jest.spyOn(service, 'updateFlag').mockResolvedValueOnce({
      data: {
        flagKey: 'flagKey',
        action: FlagActions.TURN_FLAG_ON,
        comment: 'Automatically switched by the webhook service.',
      },
    });

    controller.updateFeatureFlag('flag', FlagActions.TURN_FLAG_ON);

    expect(serviceSpy).toBeCalledWith(
      'flag',
      FlagActions.TURN_FLAG_ON,
      'Automatically switched by the webhook service.'
    );
  });
});
