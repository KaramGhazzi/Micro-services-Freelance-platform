import { Test } from '@nestjs/testing';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { GetUserByEmailService } from '@package/general';
import { GraphQlClient } from '@package/m2m';
import { AuthorizationCacheService } from '@package/authorization';
import { AuthErrorCodes, User as FirebaseUser } from 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { LegacyUserService } from '../legacy-user/legacy-user.service';
import { LoginService } from './login.service';

describe('LoginService - Unit test', () => {
  let getContractSubscriptionServiceBusClient: Partial<AzureServiceBusClient>;
  let loginService: LoginService;

  beforeEach(async () => {
    getContractSubscriptionServiceBusClient = {
      sendAndReceive: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: FirebaseService,
          useValue: {
            isInFirebase: jest.fn(),
            signInWithEmailAndPassword: jest.fn(),
          },
        },
        {
          provide: GetUserByEmailService,
          useValue: {
            getUserByEmail: jest.fn(),
          },
        },
        {
          provide: Topic.CONTRACT_SUBSCRIPTION_GET_BY_COMPANY,
          useValue: getContractSubscriptionServiceBusClient,
        },
        {
          provide: LegacyUserService,
          useValue: {
            migrateLegacyUserWithPassword: jest.fn(),
          },
        },
        {
          provide: AuthorizationCacheService,
          useValue: {
            set: jest.fn(),
          },
        },
        {
          provide: GraphQlClient,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
  });

  describe('MigrateOrLogin', () => {
    it('Should not try to migrate when user is in Firebase', async () => {
      jest
        .spyOn(loginService, 'signInWithFirebase')
        .mockResolvedValue({ id: 1 } as unknown as FirebaseUser);

      jest.spyOn(loginService, 'migrateWithPassword');

      await loginService.migrateOrLogin('email@email.com', 'password123!@');

      expect(loginService.migrateWithPassword).not.toHaveBeenCalled();
    });

    it('Should not try to migrate when any error is thrown other than user-not-found', async () => {
      jest
        .spyOn(loginService, 'signInWithFirebase')
        .mockRejectedValueOnce({
          code: AuthErrorCodes.INVALID_EMAIL,
          message: 'this-is-not-the-error-we-are-looking-for',
        })
        .mockResolvedValueOnce({ id: 1 } as unknown as FirebaseUser);

      jest.spyOn(loginService, 'migrateWithPassword').mockResolvedValue();

      await expect(
        loginService.migrateOrLogin('email@email.com', 'password123!!@')
      ).rejects.toStrictEqual({
        code: AuthErrorCodes.INVALID_EMAIL,
        message: 'this-is-not-the-error-we-are-looking-for',
      });
      expect(loginService.migrateWithPassword).not.toHaveBeenCalled();
    });

    it('Should try to migrate when a user is not in Firebase and then login if the migration is successful', async () => {
      jest
        .spyOn(loginService, 'signInWithFirebase')
        .mockRejectedValueOnce({
          code: AuthErrorCodes.USER_DELETED,
          message: 'this-is-the-error-we-are-looking-for',
        })
        .mockResolvedValueOnce({ id: 1 } as unknown as FirebaseUser);

      jest.spyOn(loginService, 'migrateWithPassword').mockResolvedValue();

      await loginService.migrateOrLogin('email@email.com', 'password123!!@');

      expect(loginService.migrateWithPassword).toHaveBeenCalledTimes(1);
      expect(loginService.signInWithFirebase).toHaveBeenCalledTimes(2); // the first time it should fail, the second time it should succeed if the migration was successful
    });

    it('Should try to migrate when a user is not in Firebase and not login if the migration is unsuccessful', async () => {
      jest
        .spyOn(loginService, 'signInWithFirebase')
        .mockRejectedValueOnce({
          code: AuthErrorCodes.USER_DELETED,
          message: 'this-is-the-error-we-are-looking-for',
        })
        .mockResolvedValueOnce({ id: 1 } as unknown as FirebaseUser);

      jest
        .spyOn(loginService, 'migrateWithPassword')
        .mockRejectedValue({ message: 'Could not migrate' });

      await expect(
        loginService.migrateOrLogin('email@email.com', 'password123!!@')
      ).rejects.toStrictEqual({ message: 'Could not migrate' });

      expect(loginService.migrateWithPassword).toHaveBeenCalledTimes(1);
      expect(loginService.signInWithFirebase).toHaveBeenCalledTimes(1);
    });
  });
});
