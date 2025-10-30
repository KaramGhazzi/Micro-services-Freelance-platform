import { Inject, Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { LegacyAuthenticationHelper } from '@package/legacy-authentication';
import {
  RemoveLegacyCredentialsEvent,
  GetUserMigrationStatusEvent,
  GetUserMigrationStatusEventResponse,
  SetFirebaseUidEvent,
} from '@package/types/dist/events';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class LegacyUserService {
  private readonly logger = new Logger(LegacyUserService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject(Topic.CORE_USER_GET_MIGRATION_STATUS)
    private readonly getUserMigrationStatusServiceBusClient: AzureServiceBusClient<
      GetUserMigrationStatusEvent,
      GetUserMigrationStatusEventResponse
    >,
    @Inject(Topic.CORE_REMOVE_LEGACY_CREDENTIALS)
    private readonly removeUserLegacyCredentialsServiceBusClient: AzureServiceBusClient<RemoveLegacyCredentialsEvent>,
    @Inject(Topic.CORE_USER_SET_FIREBASE_UID)
    private readonly setFirebaseUidServiceBusClient: AzureServiceBusClient<SetFirebaseUidEvent>
  ) {}

  async migrateLegacyUserWithPassword(
    email: string,
    password: string
  ): Promise<void> {
    const response = await this.getMigrationStatus(email);

    if (LegacyUserService.userIsMigrated(response)) {
      return;
    }

    const hash = LegacyAuthenticationHelper.getLegacyPasswordHash(
      password,
      response.legacySalt
    );
    if (hash !== response.legacyPasswordHash) {
      throw new Error('credentialsInvalid');
    }

    await this.createFirebaseUser(email, password);

    this.removeLegacyCredentials(email);
  }

  async migrateLegacyUserWithoutPassword(email) {
    const response = await this.getMigrationStatus(email);

    if (LegacyUserService.userIsMigrated(response)) {
      return;
    }

    await this.createFirebaseUser(
      email,
      crypto.randomBytes(32).toString('hex')
    );
    this.removeLegacyCredentials(email);
  }

  private async getMigrationStatus(
    email: string
  ): Promise<GetUserMigrationStatusEventResponse> {
    const body: GetUserMigrationStatusEvent = { email };
    const response =
      await this.getUserMigrationStatusServiceBusClient.sendAndReceive({
        payload: {
          body,
        },
      });

    return response.body;
  }

  private static userIsMigrated(
    response: GetUserMigrationStatusEventResponse
  ): boolean {
    return response.status !== 'USER_NOT_MIGRATED';
  }

  private async createFirebaseUser(email: string, password: string) {
    this.logger.log(`Migrating account ${email} to firebase`);

    const adminAuth = this.firebaseService.getAdminAuth();

    // Create a new user with the given credentials.
    try {
      const user = await adminAuth.createUser({
        email,
        password,
        disabled: false,
        emailVerified: true,
      });

      await this.setFirebaseUidServiceBusClient.emit({
        payload: {
          body: {
            email,
            firebaseUid: user.uid,
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `Migrating account ${email} failed: ${error.code}, ${error.text}`
      );

      if (error.code === 'auth/email-already-exists') {
        // Somehow the account is already known in firebase, so lets remove the legacy credentials
        this.removeLegacyCredentials(email);
        return;
      }
      throw new Error('Failed to create user in provider');
    }
  }

  private removeLegacyCredentials(email: string) {
    const body = { email };
    // Fire and forget. If the user somehow tries to log in again and firebase already knows the user,
    // we try removing the legacy credentials again and continue with the normal login flow.
    this.removeUserLegacyCredentialsServiceBusClient.emit({
      payload: { body },
    });
  }
}
