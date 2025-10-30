import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { excludedPaths as genericExcludedPaths } from './_libs/excludedPaths';
import { isMatchingPath } from './_libs/isMatchingPath';
import { MiddlewareFactory } from './types';
import { companyIdCookie } from '@/app/_libs/authCookies';

const excludedPaths = [
  ...genericExcludedPaths,
  '/account-voltooien',
  '/inloggen',
  '/wachtwoord',
  '/registreren',
];
const setupPath = new URL(
  '/account-voltooien',
  process.env.NEXT_PUBLIC_BASE_URL
);

const setupRequirements = [
  /** Only users with an active company can use the application */
  (request: NextRequest): boolean => {
    const { name } = companyIdCookie;
    return request.cookies.get(name)?.value != null;
  },
];

/**
 * Middleware to redirect a user to the setup page when the setup is not completed
 */
export const notSetup: MiddlewareFactory =
  (next) => (request: NextRequest, _next: NextFetchEvent) => {
    if (excludedPaths.some((path) => isMatchingPath(request, path))) {
      return next(request, _next);
    }

    for (const isSetup of setupRequirements) {
      if (!isSetup(request)) {
        return NextResponse.redirect(setupPath);
      }
    }

    return next(request, _next);
  };
