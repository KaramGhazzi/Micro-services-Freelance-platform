import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserPasswordChangedEvent } from '@package/types/dist/events';
import { GetUserByEmailService } from '@package/general';
import { AzureServiceBusClient, Topic } from '@package/azure-service-bus';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class PasswordUpdateService {
  private readonly logger = new Logger(PasswordUpdateService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly getUserByEmailService: GetUserByEmailService,
    @Inject(Topic.USER_PASSWORD_CHANGED)
    private readonly userPasswordChangedServiceBusClient: AzureServiceBusClient<UserPasswordChangedEvent>
  ) {}

  async updatePassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ) {
    const adminAuth = this.firebaseService.getAdminAuth();

    const user = await adminAuth.getUserByEmail(email);

    if (!user) throw new Error('UserNotFound');

    const clientAuth = this.firebaseService.getClientAuth();

    try {
      await this.firebaseService.signInWithEmailAndPassword(
        clientAuth,
        email,
        currentPassword
      );
    } catch {
      throw new Error('credentialsInvalid');
    }

    const { isValid } = await this.firebaseService.validatePassword(
      clientAuth,
      newPassword
    );

    if (!isValid) {
      throw new Error('passwordTooWeak');
    }

    await adminAuth.updateUser(user.uid, {
      password: newPassword,
    });

    const coreUser = await this.getUserByEmailService.getUserByEmail(email);

    await this.userPasswordChangedServiceBusClient.emit({
      payload: {
        body: {
          owner: {
            id: coreUser.id,
            email,
            firstName: coreUser.firstName,
            settings: coreUser.settings,
          },
        },
      },
      options: {},
    });

    return { success: true };
  }
}
