import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@package/authorization';
import { GetUserByEmailService } from '@package/general';
import { UserEvents } from './user.events';
import { UserService } from './user.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { LoginService } from '../login/login.service';
import { LegacyUserModule } from '../legacy-user/legacy-user.module';

@Module({
  providers: [UserEvents, LoginService, UserService, GetUserByEmailService],
  imports: [FirebaseModule, AuthorizationModule, LegacyUserModule],
})
export class UserModule {}
