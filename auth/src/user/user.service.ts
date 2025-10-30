import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private readonly logger = new Logger(UserService.name);

  async addUser(email: string, password: string): Promise<string> {
    this.logger.debug(`Adding user with email: ${email}`);
    const firebaseUser = await this.firebaseService
      .getAdminAuth()
      .createUser({ email, password });
    return firebaseUser.uid;
  }
}
