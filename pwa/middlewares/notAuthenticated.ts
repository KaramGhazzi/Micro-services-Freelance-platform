import { checkTokenValidity } from '@package/fbjwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';
import { excludedPaths } from './_libs/excludedPaths';
import { isMatchingPath } from './_libs/isMatchingPath';
import {
  authenticationTokenCookie,
  refreshTokenCookie,
} from '@/app/_libs/authCookies';

export const notAuthenticated: MiddlewareFactory = (next) => {
  const paths = [
    '/inloggen',
    '/wachtwoord',
    '/registreren',
    '/email-aanpassing-bevestigen',
    '/robots.txt',
  ];

  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { name: authenticationName } = authenticationTokenCookie;
    const { name: refreshName } = refreshTokenCookie;

    if (excludedPaths.some((path) => isMatchingPath(request, path))) {
      return next(request, _next);
    }

    if (!paths.some((path) => isMatchingPath(request, path))) {
      const token = request.cookies.get(authenticationName)?.value;
      const verificationResult = await checkTokenValidity(token);

      if (!verificationResult) {
        const url = new URL(`/inloggen`, process.env.NEXT_PUBLIC_BASE_URL);
        url.searchParams.set('redirect', request.nextUrl.pathname.toString());

        const response = NextResponse.redirect(url);

        // Delete cookie because jwt is invalid
        response.cookies.delete(authenticationName);

        return response;
      }
    }

    return next(request, _next);
  };
};
