import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import firebaseAdmin from 'firebase-admin';
import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(FirebaseService.name);

  apiKey = this.configService.get('FIREBASE_API_KEY');

  // Initialize the Firebase Admin SDK and Firebase Client SDK once
  onApplicationBootstrap() {
    const firebaseAdminServiceAccountKeyBase64 = this.configService.get(
      'FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY_BASE64'
    );
    const firebaseClientConfigBase64 = this.configService.get(
      'FIREBASE_CLIENT_CONFIG_BASE64'
    );

    if (firebaseAdminServiceAccountKeyBase64 && firebaseClientConfigBase64) {
      try {
        // Initialize the Firebase Admin SDK.
        firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(
            JSON.parse(atob(firebaseAdminServiceAccountKeyBase64))
          ),
        });

        // Initialize the Firebase Client SDK.
        firebase.initializeApp(JSON.parse(atob(firebaseClientConfigBase64)));
      } catch (error) {
        this.logger.error(error);
      }
    } else {
      this.logger.warn(
        'Firebase Admin SDK and Firebase Client SDK are not initialized because the required environment variables are not set.'
      );
    }
  }

  getAdminAuth = firebaseAdmin.auth;

  getClientAuth = firebaseAuth.getAuth;

  signInWithEmailAndPassword = firebaseAuth.signInWithEmailAndPassword;

  validatePassword = firebaseAuth.validatePassword;

  updatePassword = firebaseAuth.updatePassword;
}
