import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@package/authorization';
import { GetUserByEmailService } from '@package/general';
import { FirebaseModule } from '../firebase/firebase.module';
import { LoginService } from './login.service';
import { LoginResolver } from './login.resolver';
import { LegacyUserModule } from '../legacy-user/legacy-user.module';

@Module({
  providers: [LoginService, LoginResolver, GetUserByEmailService],
  imports: [FirebaseModule, AuthorizationModule, LegacyUserModule],
  exports: [LoginService],
})
export class LoginModule {}
