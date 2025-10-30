import { AuthErrorCodes } from 'firebase/auth';

export type FirebaseError = {
  code: string;
  message: string;
};

export const isUserNotFoundError = (error: FirebaseError) =>
  error.code === AuthErrorCodes.USER_DELETED; // weird I know but this is official Firebase ErrorCodes enum, not-found != deleted?

export const isInvalidEmailError = (error: FirebaseError) =>
  error.code === AuthErrorCodes.INVALID_EMAIL;

export const isUserDisabledError = (error: FirebaseError) =>
  error.code === AuthErrorCodes.USER_DISABLED;

export const isInvalidPasswordError = (error: FirebaseError) =>
  error.code === AuthErrorCodes.INVALID_PASSWORD;
