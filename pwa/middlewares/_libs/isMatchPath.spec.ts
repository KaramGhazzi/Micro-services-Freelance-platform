import { NextRequest } from 'next/server';
import { isMatchingPath } from './isMatchingPath';

describe('isMatchingPath', () => {
  it('returns true when the request path starts with the given path', () => {
    const mockRequest = {
      nextUrl: {
        pathname: '/api/users/123',
      },
    } as NextRequest;

    const path = '/api/users';
    expect(isMatchingPath(mockRequest, path)).toBe(true);
  });

  it('returns false when the request path does not start with the given path', () => {
    const mockRequest = {
      nextUrl: {
        pathname: '/api/products/123',
      },
    } as NextRequest;

    const path = '/api/users';
    expect(isMatchingPath(mockRequest, path)).toBe(false);
  });

  it('returns false when the path is empty', () => {
    const mockRequest = {
      nextUrl: {
        pathname: '/api/users/123',
      },
    } as NextRequest;

    const path = '';
    expect(isMatchingPath(mockRequest, path)).toBe(false);
  });

  it('returns false when the request path is empty', () => {
    const mockRequest = {
      nextUrl: {
        pathname: '',
      },
    } as NextRequest;

    const path = '/api/users';
    expect(isMatchingPath(mockRequest, path)).toBe(false);
  });

  it('returns false when the request is null or undefined', () => {
    const path = '/api/users';
    expect(isMatchingPath(null as any, path)).toBe(false);
    expect(isMatchingPath(undefined as any, path)).toBe(false);
  });

  it('returns false when nextUrl is null or undefined', () => {
    const mockRequest = {
      nextUrl: null,
    } as any;

    const path = '/api/users';
    expect(isMatchingPath(mockRequest, path)).toBe(false);
  });

  it('returns false when pathname is null or undefined', () => {
    const mockRequest = {
      nextUrl: {
        pathname: null,
      },
    } as any;

    const path = '/api/users';
    expect(isMatchingPath(mockRequest, path)).toBe(false);
  });
});
