import { Module } from '@nestjs/common';
import { GetUserByEmailService } from '@package/general';
import { PasswordForgetService } from './password-forget.service';
import { PasswordForgetResolver } from './password-forget.resolver';
import { FirebaseModule } from '../firebase/firebase.module';
import { LegacyUserModule } from '../legacy-user/legacy-user.module';

@Module({
  providers: [
    PasswordForgetService,
    PasswordForgetResolver,
    GetUserByEmailService,
  ],
  imports: [FirebaseModule, LegacyUserModule],
})
export class PasswordForgetModule {}
