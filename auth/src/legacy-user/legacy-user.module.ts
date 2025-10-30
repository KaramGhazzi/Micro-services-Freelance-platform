import { Module } from '@nestjs/common';
import { LegacyUserService } from './legacy-user.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  providers: [LegacyUserService],
  exports: [LegacyUserService],
  imports: [FirebaseModule],
})
export class LegacyUserModule {}
