import { NextRequest } from 'next/server';

export function isMatchingPath(request: NextRequest, path: string): boolean {
  if (path === '') {
    return false;
  }
  return request?.nextUrl?.pathname?.startsWith(path) ?? false;
}
