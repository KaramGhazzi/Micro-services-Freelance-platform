import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@package/authorization';
import { GetUserByEmailService } from '@package/general';
import { InviteResolver } from './invite.resolver';
import { InviteService } from './invite.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { LoginService } from '../login/login.service';
import { LegacyUserModule } from '../legacy-user/legacy-user.module';

@Module({
  providers: [
    InviteResolver,
    InviteService,
    LoginService,
    GetUserByEmailService,
  ],
  imports: [FirebaseModule, AuthorizationModule, LegacyUserModule],
})
export class InviteModule {}
