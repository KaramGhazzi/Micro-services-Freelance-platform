import { Test, TestingModule } from '@nestjs/testing';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { ConfigService } from '@nestjs/config';
import firebaseAdmin from 'firebase-admin';
import { fakerNL as faker } from '@faker-js/faker';
import { GetUserByEmailService } from '@package/general';
import { PasswordForgetService } from './password-forget.service';
import { FirebaseService } from '../firebase/firebase.service';
import { LegacyUserService } from '../legacy-user/legacy-user.service';

describe('PasswordForgetService', () => {
  let passwordForgetService: PasswordForgetService;
  let fireBaseAdminAuthMock: Partial<firebaseAdmin.auth.Auth>;
  let firebaseServiceMock: Partial<FirebaseService>;
  let configServiceMock: Partial<ConfigService>;
  let legacyUserServiceMock: Partial<LegacyUserService>;
  let setPasswordResetTokenServiceBusMock: Partial<AzureServiceBusClient>;
  let getPasswordResetTokenServiceBusMock: Partial<AzureServiceBusClient>;
  let removePasswordResetTokenServiceBusMock: Partial<AzureServiceBusClient>;
  let userPasswordResetRequestedServiceBusMock: Partial<AzureServiceBusClient>;
  let userPasswordChangedServiceBusClient: Partial<AzureServiceBusClient>;

  beforeEach(async () => {
    fireBaseAdminAuthMock = {
      getUserByEmail: jest.fn(),
      updateUser: jest.fn(),
      createCustomToken: jest.fn(),
    };

    firebaseServiceMock = {
      getAdminAuth: jest.fn(
        () => fireBaseAdminAuthMock as unknown as firebaseAdmin.auth.Auth
      ),
    };

    configServiceMock = {
      get: jest.fn(),
    };

    setPasswordResetTokenServiceBusMock = {
      sendAndReceive: jest.fn(),
    };

    getPasswordResetTokenServiceBusMock = {
      sendAndReceive: jest.fn(),
    };

    removePasswordResetTokenServiceBusMock = {
      sendAndReceive: jest.fn(),
    };

    userPasswordResetRequestedServiceBusMock = {
      emit: jest.fn(),
    };

    userPasswordChangedServiceBusClient = {
      emit: jest.fn(),
    };

    legacyUserServiceMock = {
      migrateLegacyUserWithoutPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordForgetService,
        {
          provide: GetUserByEmailService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue({
              id: 1,
              firstName: 'henk',
              settings: [],
            }),
          },
        },
        { provide: FirebaseService, useValue: firebaseServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
        {
          provide: Topic.CORE_USER_GET_BY_PASSWORD_RESET_TOKEN,
          useValue: getPasswordResetTokenServiceBusMock,
        },
        {
          provide: Topic.CORE_USER_SET_PASSWORD_RESET_TOKEN,
          useValue: setPasswordResetTokenServiceBusMock,
        },
        {
          provide: Topic.CORE_USER_REMOVE_PASSWORD_RESET_TOKEN,
          useValue: removePasswordResetTokenServiceBusMock,
        },
        {
          provide: Topic.USER_PASSWORD_RESET_REQUESTED,
          useValue: userPasswordResetRequestedServiceBusMock,
        },
        {
          provide: Topic.USER_PASSWORD_CHANGED,
          useValue: userPasswordChangedServiceBusClient,
        },
        { provide: LegacyUserService, useValue: legacyUserServiceMock },
      ],
    }).compile();

    passwordForgetService = module.get<PasswordForgetService>(
      PasswordForgetService
    );
  });

  describe('initiatePasswordReset', () => {
    it('should initiate password reset and send email', async () => {
      const setPasswordResetTokenMock = jest
        .spyOn(passwordForgetService, 'setPasswordResetToken')
        .mockResolvedValue(true);
      const sendPasswordResetEmailMock = jest
        .spyOn(passwordForgetService, 'sendPasswordResetEmail')
        .mockResolvedValue();

      const result = await passwordForgetService.initiatePasswordReset(
        'test@example.com'
      );

      expect(setPasswordResetTokenMock).toHaveBeenCalled();
      expect(sendPasswordResetEmailMock).toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });

    it('should not send email if setPasswordResetToken fails', async () => {
      const setPasswordResetTokenMock = jest
        .spyOn(passwordForgetService, 'setPasswordResetToken')
        .mockResolvedValue(false);

      const sendPasswordResetEmailMock = jest
        .spyOn(passwordForgetService, 'sendPasswordResetEmail')
        .mockResolvedValue();

      const result = await passwordForgetService.initiatePasswordReset(
        'test@example.com'
      );

      expect(setPasswordResetTokenMock).toHaveBeenCalled();
      expect(sendPasswordResetEmailMock).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });
  });

  describe('setPasswordResetToken', () => {
    it('should set password reset token', async () => {
      const testEmail = faker.internet.email();
      const testPasswordResetToken = faker.string.alphanumeric(32);

      const sendAndReceiveMock = jest
        .spyOn(setPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: true,
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const result = await passwordForgetService.setPasswordResetToken(
        testEmail,
        testPasswordResetToken
      );

      expect(sendAndReceiveMock).toHaveBeenCalledWith({
        payload: {
          body: {
            email: testEmail,
            passwordResetToken: testPasswordResetToken,
          },
        },
      });

      expect(result).toEqual(true);
    });

    it('should return false if user not found when setting password reset token', async () => {
      const testEmail = faker.internet.email();
      const testPasswordResetToken = faker.string.alphanumeric(32);

      const sendAndReceiveMock = jest
        .spyOn(setPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: false,
            errorType: 'USER_NOT_FOUND',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const result = await passwordForgetService.setPasswordResetToken(
        testEmail,
        testPasswordResetToken
      );

      expect(sendAndReceiveMock).toHaveBeenCalledWith({
        payload: {
          body: {
            email: testEmail,
            passwordResetToken: testPasswordResetToken,
          },
        },
      });

      expect(result).toEqual(false);
    });

    it('should throw error if unknown error when setting password reset token', async () => {
      const testEmail = faker.internet.email();
      const testPasswordResetToken = faker.string.alphanumeric(32);

      const sendAndReceiveMock = jest
        .spyOn(setPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: false,
            errorType: 'UNKNOWN',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      await expect(
        passwordForgetService.setPasswordResetToken(
          testEmail,
          testPasswordResetToken
        )
      ).rejects.toThrow('Unknown error');

      expect(sendAndReceiveMock).toHaveBeenCalledWith({
        payload: {
          body: {
            email: testEmail,
            passwordResetToken: testPasswordResetToken,
          },
        },
      });
    });

    it('should throw error if no response when setting password reset token', async () => {
      const testEmail = faker.internet.email();
      const testPasswordResetToken = faker.string.alphanumeric(32);

      const sendAndReceiveMock = jest
        .spyOn(setPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue(null);

      await expect(
        passwordForgetService.setPasswordResetToken(
          testEmail,
          testPasswordResetToken
        )
      ).rejects.toThrow('Did not receive response from core service');

      expect(sendAndReceiveMock).toHaveBeenCalledWith({
        payload: {
          body: {
            email: expect.any(String),
            passwordResetToken: expect.any(String),
          },
        },
      });
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send password reset email', async () => {
      const testEmail = faker.internet.email();
      const testPasswordResetToken = faker.string.alphanumeric(32);

      const sendAndReceiveMock = jest
        .spyOn(userPasswordResetRequestedServiceBusMock, 'emit')
        .mockResolvedValue();

      await passwordForgetService.sendPasswordResetEmail(
        testEmail,
        testPasswordResetToken
      );

      expect(sendAndReceiveMock).toHaveBeenCalledWith({
        options: {},
        payload: {
          body: {
            owner: { email: testEmail, firstName: 'henk', id: 1, settings: [] },
            passwordResetToken: testPasswordResetToken,
          },
        },
      });
    });

    it('should throw error if failed to send password reset email', async () => {
      const testEmail = faker.internet.email();
      const testPasswordResetToken = faker.string.alphanumeric(32);

      jest
        .spyOn(userPasswordResetRequestedServiceBusMock, 'emit')
        .mockRejectedValue(new Error('Failed to send password reset email'));

      await expect(
        passwordForgetService.sendPasswordResetEmail(
          testEmail,
          testPasswordResetToken
        )
      ).rejects.toThrow('Failed to send password reset email');
    });
  });

  describe('resetPassword', () => {
    it('should reset password', async () => {
      const testPasswordResetToken = faker.string.alphanumeric(32);
      const testNewPassword = faker.internet.password();
      const testEmail = faker.internet.email();
      const testUid = faker.string.alphanumeric(32);

      // Mock all the things.
      jest
        .spyOn(passwordForgetService, 'getUserEmailByPasswordResetToken')
        .mockResolvedValue(testEmail);

      jest.spyOn(fireBaseAdminAuthMock, 'getUserByEmail').mockResolvedValue({
        uid: testUid,
      } as never);

      jest
        .spyOn(fireBaseAdminAuthMock, 'createCustomToken')
        .mockReturnValue(Promise.resolve('test-token'));

      jest
        .spyOn(passwordForgetService, 'removePasswordResetToken')
        .mockResolvedValue();

      const response = await passwordForgetService.resetPassword(
        testPasswordResetToken,
        testNewPassword
      );

      expect(response).toEqual({ token: 'test-token' });
    });

    it('should throw error if failed to reset password', async () => {
      const testPasswordResetToken = faker.string.alphanumeric(32);
      const testNewPassword = faker.internet.password();
      const testEmail = faker.internet.email();

      // Mock all the things.
      jest
        .spyOn(passwordForgetService, 'getUserEmailByPasswordResetToken')
        .mockResolvedValue(testEmail);

      jest
        .spyOn(fireBaseAdminAuthMock, 'getUserByEmail')
        .mockRejectedValue(new Error('Failed to get user by email'));

      await expect(
        passwordForgetService.resetPassword(
          testPasswordResetToken,
          testNewPassword
        )
      ).rejects.toThrow('Failed to reset password');
    });
  });

  describe('getUserEmailByPasswordResetToken', () => {
    it('should get user email by password reset token', async () => {
      const testPasswordResetToken = faker.string.alphanumeric(32);
      const testEmail = faker.internet.email();

      const sendAndReceiveMock = jest
        .spyOn(getPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: true,
            email: testEmail,
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const response =
        await passwordForgetService.getUserEmailByPasswordResetToken(
          testPasswordResetToken
        );

      expect(sendAndReceiveMock).toHaveBeenCalledWith({
        payload: {
          body: {
            passwordResetToken: testPasswordResetToken,
          },
        },
      });

      expect(response).toEqual(testEmail);
    });

    it('should throw error if token invalid', async () => {
      const testPasswordResetToken = faker.string.alphanumeric(32);

      jest
        .spyOn(getPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: false,
            errorType: 'TOKEN_INVALID',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      await expect(
        passwordForgetService.getUserEmailByPasswordResetToken(
          testPasswordResetToken
        )
      ).rejects.toThrow('Token invalid');
    });

    it('should throw error if unknown error', async () => {
      const testPasswordResetToken = faker.string.alphanumeric(32);

      jest
        .spyOn(getPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: false,
            errorType: 'UNKNOWN',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      await expect(
        passwordForgetService.getUserEmailByPasswordResetToken(
          testPasswordResetToken
        )
      ).rejects.toThrow('Unknown error');
    });

    it('should throw error if no response', async () => {
      const testPasswordResetToken = faker.string.alphanumeric(32);

      jest
        .spyOn(getPasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue(null);

      await expect(
        passwordForgetService.getUserEmailByPasswordResetToken(
          testPasswordResetToken
        )
      ).rejects.toThrow('Did not receive response from core service');
    });
  });

  describe('removePasswordResetToken', () => {
    it('should remove password reset token', async () => {
      const testEmail = faker.internet.email();

      const sendAndReceiveMock = jest
        .spyOn(removePasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: true,
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      await passwordForgetService.removePasswordResetToken(testEmail);

      expect(sendAndReceiveMock).toHaveBeenCalledWith({
        payload: {
          body: {
            email: testEmail,
          },
        },
      });
    });

    it('should throw error if failed to remove password reset token', async () => {
      const testEmail = faker.internet.email();

      jest
        .spyOn(removePasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            success: false,
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      await expect(
        passwordForgetService.removePasswordResetToken(testEmail)
      ).rejects.toThrow('Failed to remove password reset token');
    });

    it('should throw error if no response', async () => {
      const testEmail = faker.internet.email();

      jest
        .spyOn(removePasswordResetTokenServiceBusMock, 'sendAndReceive')
        .mockResolvedValue(null);

      await expect(
        passwordForgetService.removePasswordResetToken(testEmail)
      ).rejects.toThrow(
        'Did not receive response from core service while removing password reset token'
      );
    });
  });
});
