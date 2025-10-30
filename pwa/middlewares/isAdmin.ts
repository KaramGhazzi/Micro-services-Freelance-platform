import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { checkTokenValidity } from '@package/fbjwt';
import { UserRole } from '@package/types/dist/class-validator';
import { MiddlewareFactory } from './types';
import { excludedPaths } from './_libs/excludedPaths';
import { isMatchingPath } from './_libs/isMatchingPath';
import { authenticationTokenCookie } from '@/app/_libs/authCookies';

export const isAdmin: MiddlewareFactory = (next) => {
  const paths = ['/admin'];

  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { name } = authenticationTokenCookie;

    if (excludedPaths.some((path) => isMatchingPath(request, path))) {
      return next(request, _next);
    }

    if (paths.some((path) => isMatchingPath(request, path))) {
      const token = request.cookies.get(name)?.value;
      const verificationResult = await checkTokenValidity(token);

      if (verificationResult) {
        const isAdmin = verificationResult?.payload?.role === UserRole.ADMIN;

        if (!isAdmin) {
          const url = new URL(`/dashboard`, process.env.NEXT_PUBLIC_BASE_URL);
          return NextResponse.redirect(url);
        }
      } else {
        const url = new URL(`/inloggen`, process.env.NEXT_PUBLIC_BASE_URL);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
