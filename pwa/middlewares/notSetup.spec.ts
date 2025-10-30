import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { isMatchingPath } from './_libs/isMatchingPath';
import { notSetup } from './notSetup';

jest.mock('./_libs/isMatchingPath');
jest.mock('@/app/_libs/authCookies', () => ({
  companyIdCookie: {
    name: 'company-id',
  },
}));

describe('notSetup middleware', () => {
  const mockNext = jest.fn();
  const mockRequest = {
    cookies: {
      get: jest.fn(),
    },
  } as unknown as NextRequest;

  const mockNextFetchEvent = {} as NextFetchEvent;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNext.mockImplementation(() => {
      return NextResponse.next();
    });
  });

  it('should call the next middleware when the request path matches an excluded path', () => {
    (isMatchingPath as jest.Mock).mockReturnValue(true);

    const middleware = notSetup(mockNext);
    const response = middleware(mockRequest, mockNextFetchEvent);

    expect(isMatchingPath).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(mockRequest, mockNextFetchEvent);
    expect(response).toEqual(NextResponse.next());
  });

  it('should redirect to setup path if company setup requirement is not met', () => {
    (isMatchingPath as jest.Mock).mockReturnValue(false);
    (mockRequest.cookies.get as jest.Mock).mockReturnValueOnce({ value: null });

    const middleware = notSetup(mockNext);
    const response = middleware(mockRequest, mockNextFetchEvent);

    expect(isMatchingPath).toHaveBeenCalled();
    expect(mockRequest.cookies.get).toHaveBeenCalledWith('company-id');
    expect((response as NextResponse).status).toBe(307); // 307 is the status code for temporary redirect
    expect((response as NextResponse).headers.get('location')).toBe(
      new URL('/account-voltooien', process.env.NEXT_PUBLIC_BASE_URL).toString()
    );
  });

  it('should call the next middleware if all setup requirements are met', () => {
    (isMatchingPath as jest.Mock).mockReturnValue(false);
    (mockRequest.cookies.get as jest.Mock).mockReturnValueOnce({
      value: 'some-value',
    });

    const middleware = notSetup(mockNext);
    const response = middleware(mockRequest, mockNextFetchEvent);

    expect(isMatchingPath).toHaveBeenCalled();
    expect(mockRequest.cookies.get).toHaveBeenCalledWith('company-id');
    expect(mockNext).toHaveBeenCalledWith(mockRequest, mockNextFetchEvent);
    expect(response).toEqual(NextResponse.next());
  });
});
