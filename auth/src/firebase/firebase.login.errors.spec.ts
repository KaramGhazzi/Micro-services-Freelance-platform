import { AuthErrorCodes } from 'firebase/auth';
import {
  isInvalidEmailError,
  isUserDisabledError,
  isUserNotFoundError,
  isInvalidPasswordError,
} from './firebase.login.errors';

describe('Firebase Login Errors - unit test', () => {
  it('Should return true when the error is a user-not-found error', () => {
    const error = {
      code: AuthErrorCodes.USER_DELETED,
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isUserNotFoundError(error)).toEqual(true);
  });

  it('Should return false when the error is not a user-not-found error', () => {
    const error = {
      code: 'this-is-not-the-error-you-are-looking-for',
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isUserNotFoundError(error)).toEqual(false);
  });

  it('Should return true when the error is a invalid-email error', () => {
    const error = {
      code: AuthErrorCodes.INVALID_EMAIL,
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isInvalidEmailError(error)).toEqual(true);
  });

  it('Should return false when the error is not a invalid-email error', () => {
    const error = {
      code: 'this-is-not-the-error-you-are-looking-for',
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isInvalidEmailError(error)).toEqual(false);
  });

  it('Should return true when the error is a user-disabled error', () => {
    const error = {
      code: AuthErrorCodes.USER_DISABLED,
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isUserDisabledError(error)).toEqual(true);
  });

  it('Should return false when the error is not a user-disabled error', () => {
    const error = {
      code: 'this-is-not-the-error-you-are-looking-for',
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isUserDisabledError(error)).toEqual(false);
  });

  it('Should return true when the error is a wrong-password error', () => {
    const error = {
      code: AuthErrorCodes.INVALID_PASSWORD,
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isInvalidPasswordError(error)).toEqual(true);
  });

  it('Should return false when the error is not a wrong-password error', () => {
    const error = {
      code: 'this-is-not-the-error-you-are-looking-for',
      message: 'Could be anything this was not specified in the docs.',
    };
    expect(isInvalidPasswordError(error)).toEqual(false);
  });
});
