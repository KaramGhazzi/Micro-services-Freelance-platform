import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { checkTokenValidity } from '@package/fbjwt';
import { MiddlewareFactory } from './types';
import { excludedPaths } from './_libs/excludedPaths';
import { isMatchingPath } from './_libs/isMatchingPath';
import { authenticationTokenCookie } from '@/app/_libs/authCookies';

export const isAuthenticated: MiddlewareFactory = (next) => {
  const paths = ['/inloggen', '/wachtwoord'];

  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { name } = authenticationTokenCookie;

    if (excludedPaths.some((path) => isMatchingPath(request, path))) {
      return next(request, _next);
    }

    if (paths.some((path) => isMatchingPath(request, path))) {
      const token = request.cookies.get(name)?.value;
      const verificationResult = await checkTokenValidity(token);

      // If the token is valid navigate to the dashboard
      if (verificationResult) {
        const url = new URL(`/dashboard`, process.env.NEXT_PUBLIC_BASE_URL);

        return NextResponse.redirect(url);
      }
    }

    return next(request, _next);
  };
};
