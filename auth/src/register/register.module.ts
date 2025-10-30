import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@package/authorization';
import { GetUserByEmailService } from '@package/general';
import { RegisterResolver } from './register.resolver';
import { RegisterService } from './register.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { LoginService } from '../login/login.service';
import { LegacyUserModule } from '../legacy-user/legacy-user.module';

@Module({
  providers: [
    RegisterResolver,
    RegisterService,
    LoginService,
    GetUserByEmailService,
  ],
  imports: [FirebaseModule, AuthorizationModule, LegacyUserModule],
})
export class RegisterModule {}
