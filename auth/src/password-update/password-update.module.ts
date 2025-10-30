import { Module } from '@nestjs/common';
import { GetUserByEmailService } from '@package/general';
import { PasswordUpdateService } from './password-update.service';
import { PasswordUpdateResolver } from './password-update.resolver';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  providers: [
    PasswordUpdateService,
    PasswordUpdateResolver,
    GetUserByEmailService,
  ],
  imports: [FirebaseModule],
})
export class PasswordUpdateModule {}
