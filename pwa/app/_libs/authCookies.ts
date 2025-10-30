import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';

const createCookieFunctions = (cookieName: string) => {
  return {
    name: cookieName,
    value: () => getCookie(cookieName),
    exists: () => hasCookie(cookieName),
    update: (token: string) => setCookie(cookieName, token),
    delete: () => deleteCookie(cookieName),
  } as const;
};

export const authenticationTokenCookie = createCookieFunctions(
  process?.env?.['NEXT_PUBLIC_AUTHENTICATION_COOKIE_ID_TOKEN'] ??
    'freelance_id_token'
);

export const refreshTokenCookie = createCookieFunctions(
  process?.env?.['NEXT_PUBLIC_REFRESH_COOKIE_ID_TOKEN'] ??
    'freelance_refresh_token'
);

export const companyIdCookie = createCookieFunctions(
  process?.env?.['NEXT_PUBLIC_COMPANY_ID_COOKIE_NAME'] ?? 'freelance_company_id'
);
