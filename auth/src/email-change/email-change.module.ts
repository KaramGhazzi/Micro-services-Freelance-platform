import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { EmailChangeService } from './email-change.service';
import { EmailChangeResolver } from './email-change.resolver';
import { LoginModule } from '../login/login.module';

@Module({
  providers: [EmailChangeService, EmailChangeResolver],
  imports: [FirebaseModule, LoginModule],
})
export class EmailChangeModule {}
