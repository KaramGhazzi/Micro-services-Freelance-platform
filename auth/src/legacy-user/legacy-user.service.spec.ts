import { Test, TestingModule } from '@nestjs/testing';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import firebaseAdmin from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';
import { LegacyUserService } from './legacy-user.service';

describe('PasswordForgetService', () => {
  let legacyUserService: LegacyUserService;
  let fireBaseAdminAuthMock: Partial<firebaseAdmin.auth.Auth>;
  let firebaseServiceMock: Partial<FirebaseService>;
  let getUserMigrationStatusServiceBusMock: Partial<AzureServiceBusClient>;
  let removeUserLegacyCredentialsServiceBusMock: Partial<AzureServiceBusClient>;
  let setFirebaseUidServiceBusClientMock: Partial<AzureServiceBusClient>;

  beforeEach(async () => {
    getUserMigrationStatusServiceBusMock = {
      sendAndReceive: jest.fn(),
    };

    removeUserLegacyCredentialsServiceBusMock = {
      emit: jest.fn(),
    };

    setFirebaseUidServiceBusClientMock = {
      emit: jest.fn(),
    };

    fireBaseAdminAuthMock = {
      createUser: jest.fn().mockResolvedValue({ uid: 123456789 }),
    };

    firebaseServiceMock = {
      getAdminAuth: jest.fn(
        () => fireBaseAdminAuthMock as unknown as firebaseAdmin.auth.Auth
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LegacyUserService,
        { provide: FirebaseService, useValue: firebaseServiceMock },
        {
          provide: Topic.CORE_USER_GET_MIGRATION_STATUS,
          useValue: getUserMigrationStatusServiceBusMock,
        },
        {
          provide: Topic.CORE_REMOVE_LEGACY_CREDENTIALS,
          useValue: removeUserLegacyCredentialsServiceBusMock,
        },
        {
          provide: Topic.CORE_USER_SET_FIREBASE_UID,
          useValue: setFirebaseUidServiceBusClientMock,
        },
      ],
    }).compile();

    legacyUserService = module.get<LegacyUserService>(LegacyUserService);
  });

  describe('migrateLegacyUserWithPassword', () => {
    it('Should migrate an unmigrated user on login when passwords match', async () => {
      jest
        .spyOn(getUserMigrationStatusServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            status: 'USER_NOT_MIGRATED',
            legacyPasswordHash: '99eb0da4a633d6aa3f3948355e4535c930226196',
            legacySalt: 'Are you feeling salty today?',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const createUserMock = jest.spyOn(fireBaseAdminAuthMock, 'createUser');
      const removeLegacyCredentialsMock = jest.spyOn(
        removeUserLegacyCredentialsServiceBusMock,
        'emit'
      );

      await legacyUserService.migrateLegacyUserWithPassword(
        'gratis@lance.nl',
        'p4ssw0rd#'
      );
      expect(createUserMock).toHaveBeenCalled();
      expect(removeLegacyCredentialsMock).toHaveBeenCalled();
    });

    it("Should not migrate an unmigrated user on login when passwords don't match", async () => {
      jest
        .spyOn(getUserMigrationStatusServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            status: 'USER_NOT_MIGRATED',
            legacyPasswordHash: 'hashdoesntmatch',
            legacySalt: 'saltysalads',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const createUserMock = jest.spyOn(fireBaseAdminAuthMock, 'createUser');
      const removeLegacyCredentialsMock = jest.spyOn(
        removeUserLegacyCredentialsServiceBusMock,
        'emit'
      );

      expect(
        legacyUserService.migrateLegacyUserWithPassword(
          'gratis@lance.nl',
          'invalid p4ssw0rd#'
        )
      ).rejects.toThrow('credentialsInvalid');

      expect(createUserMock).not.toHaveBeenCalled();
      expect(removeLegacyCredentialsMock).not.toHaveBeenCalled();
    });

    it('Should not migrate an  already migrated user on login', async () => {
      jest
        .spyOn(getUserMigrationStatusServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            status: 'USER_MIGRATED',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const createUserMock = jest.spyOn(fireBaseAdminAuthMock, 'createUser');
      const removeLegacyCredentialsMock = jest.spyOn(
        removeUserLegacyCredentialsServiceBusMock,
        'emit'
      );

      await legacyUserService.migrateLegacyUserWithPassword(
        'gratis@lance.nl',
        'invalid p4ssw0rd#'
      );

      expect(createUserMock).not.toHaveBeenCalled();
      expect(removeLegacyCredentialsMock).not.toHaveBeenCalled();
    });
  });

  describe('migrateLegacyUserWithoutPassword', () => {
    it('Should migrate an unmigrated user', async () => {
      jest
        .spyOn(getUserMigrationStatusServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            status: 'USER_NOT_MIGRATED',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const createUserMock = jest.spyOn(fireBaseAdminAuthMock, 'createUser');
      const removeLegacyCredentialsMock = jest.spyOn(
        removeUserLegacyCredentialsServiceBusMock,
        'emit'
      );

      await legacyUserService.migrateLegacyUserWithoutPassword(
        'gratis@lance.nl'
      );
      expect(createUserMock).toHaveBeenCalled();
      expect(removeLegacyCredentialsMock).toHaveBeenCalled();
    });

    it('Should not migrate an already migrated', async () => {
      jest
        .spyOn(getUserMigrationStatusServiceBusMock, 'sendAndReceive')
        .mockResolvedValue({
          body: {
            status: 'USER_MIGRATED',
          },
          state: 'active',
          _rawAmqpMessage: {} as never,
        });

      const createUserMock = jest.spyOn(fireBaseAdminAuthMock, 'createUser');
      const removeLegacyCredentialsMock = jest.spyOn(
        removeUserLegacyCredentialsServiceBusMock,
        'emit'
      );

      await legacyUserService.migrateLegacyUserWithoutPassword(
        'gratis@lance.nl'
      );
      expect(createUserMock).not.toHaveBeenCalled();
      expect(removeLegacyCredentialsMock).not.toHaveBeenCalled();
    });
  });
});
