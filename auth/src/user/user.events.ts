import { Injectable, Logger } from '@nestjs/common';
import { Subscribe, Topic } from '@package/azure-service-bus';
import {
  UserSyncPermissionsEvent,
  UserSyncPermissionsEventResponse,
  RemoveUserFromFirebaseEvent,
  RemoveUserFromFirebaseEventResponse,
} from '@package/types/dist/events';
import { FirebaseService } from '../firebase/firebase.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class UserEvents {
  private readonly logger = new Logger(UserEvents.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly loginService: LoginService
  ) {}

  @Subscribe(Topic.CORE_USER_REMOVE_FROM_FIREBASE)
  async deleteUser(
    body: RemoveUserFromFirebaseEvent
  ): Promise<RemoveUserFromFirebaseEventResponse> {
    const adminAuth = this.firebaseService.getAdminAuth();

    try {
      await adminAuth.deleteUser(body.firebaseUid);
      return { response: true };
    } catch (error) {
      throw new Error('User not found');
    }
  }

  @Subscribe(Topic.USER_SYNC_PERMISSIONS)
  async syncPermissions(
    body: UserSyncPermissionsEvent
  ): Promise<UserSyncPermissionsEventResponse> {
    await this.loginService.syncPermissions(body.user.email);

    return { success: true };
  }
}
