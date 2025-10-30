'use client';
import { createContext, useEffect, useMemo, useState } from 'react';
import { checkTokenValidity } from '@package/fbjwt';
import { MeQuery, useMeQuery } from '@/graphql/queries/user/me.generated';
import { CompanyType, UserCompanyRole, UserRole } from '@/graphql/types';
import { useRefreshSessionMutation } from '@/graphql/mutations/auth/refreshSession.generated';
import {
  companyIdCookie,
  authenticationTokenCookie,
  refreshTokenCookie,
} from '@/app/_libs/authCookies';

export const CurrentUserContext = createContext<{
  currentUser: CurrentUser | undefined;
  currentCompanyId: string | undefined;
  currentCompany: CurrentCompany | undefined;
  currentCompanyUser: CurrentUserCompanies[0] | undefined;
  isAdminUser: boolean | undefined;
  isCompany: boolean | undefined;
  userCompanyRoles: UserCompanyRole[];

  setCurrentUser: (user: CurrentUser | undefined) => void;
  setCurrentCompanyId: (companyId: string | undefined) => void;

  refetchMe: ReturnType<typeof useMeQuery>['refetch'];
}>({
  currentUser: undefined,
  currentCompanyId: undefined,
  currentCompany: undefined,
  currentCompanyUser: undefined,
  isAdminUser: undefined,
  isCompany: undefined,
  userCompanyRoles: [],

  setCurrentUser: () => {},
  setCurrentCompanyId: () => {},

  refetchMe: () => {
    throw new Error('Unreachable code');
  },
});

interface CurrentUserContextProps {
  children?: React.ReactNode;
}

export type CurrentUser = MeQuery['me'];
export type CurrentUserCompanies = NonNullable<CurrentUser['userCompanies']>;
export type CurrentUserCompany = Omit<
  NonNullable<NonNullable<CurrentUser['userCompanies']>[0]>,
  '__typename'
>;
export type CurrentUserCompaniesRoles = NonNullable<
  CurrentUserCompany['userCompanyRoles']
>;
export type CurrentUserCompaniesRole = Omit<
  NonNullable<NonNullable<CurrentUserCompany['userCompanyRoles']>[0]>,
  '__typename'
>;
export type CurrentCompany = Omit<
  NonNullable<CurrentUserCompany['company']>,
  '__typename'
>;

export type CurrentCompanyReferences = Omit<
  NonNullable<CurrentCompany['companyReferences']>,
  '__typename'
>;

export type CurrentCompanyReference = Omit<
  NonNullable<NonNullable<CurrentCompany['companyReferences']>[0]>,
  '__typename'
>;

export const CurrentUserContextProvider = ({
  children,
}: CurrentUserContextProps) => {
  const { data, refetch: refetchMe } = useMeQuery();
  const [refreshSession] = useRefreshSessionMutation();

  // All user data is derived from the currentUser data and the Id of the selected company
  // The two states
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  const [currentCompanyId, setCurrentCompanyId] = useState<
    string | undefined
  >();

  // The derived data
  const currentCompanyUser = currentUser?.userCompanies?.find(
    (userCompany) => userCompany.company.id === currentCompanyId
  );
  const currentCompany = currentCompanyUser?.company;
  const isAdminUser = currentUser?.role === UserRole.Admin;
  const isCompany = currentCompany?.type !== CompanyType.Freelancer;
  const userCompanyRoles =
    currentCompanyUser?.userCompanyRoles?.map((role) => role.role) ?? [];

  // The effect that updates the state whenever the user data is fetched
  useEffect(() => {
    const user = data?.me;

    // If no user is logged in remove it
    if (!user) {
      setCurrentUser(undefined);
      setCurrentCompanyId(undefined);

      return;
    }

    setCurrentUser(user);

    // Load the selected company id from cookies or storage
    const storedCompanyId = companyIdCookie.value();
    const hasCompany = user.userCompanies?.some(
      (userCompany) => userCompany.company.id === storedCompanyId
    );

    if (storedCompanyId && hasCompany) {
      setCurrentCompanyId(storedCompanyId);
    } else {
      setCurrentCompanyId(undefined);
    }
  }, [data]);

  // The effect that refreshes the JWT token when needed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const getSecondsTillRefresh = async (token: string | undefined) => {
      // If the auth token is missing or invalid refetch one now
      const verificationResult = await checkTokenValidity(token);
      if (!verificationResult) return 0;

      // Calculate for how long the token will be valid
      const authTime = verificationResult.payload.auth_time as number;
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeDiff = currentTime - authTime;

      // Refresh the token 10 minutes before it expires, but if that is within 2 minutes just do it now
      const refreshIn = timeDiff - 60 * 10;
      return refreshIn < 60 * 2 ? 0 : refreshIn;
    };

    const refreshTokens = async (refreshToken: string) => {
      // Get the new tokens
      const response = await refreshSession({
        variables: {
          refreshToken,
        },
      });

      if (response.errors?.length) {
        response.errors.forEach((err) => console.error(err));
        return;
      }
      if (!response?.data?.refreshSession)
        throw new Error("Refresh session is missing it's tokens");

      // Store the new tokens in cookies
      authenticationTokenCookie.update(response.data.refreshSession.idToken);
      refreshTokenCookie.update(response.data.refreshSession.refreshToken);

      // Refetch the user data in case something changed
      // This can cause the user to log in if their auth token was expired
      const refetchMeResponse = await refetchMe();

      if (refetchMeResponse.errors?.length) {
        refetchMeResponse.errors.forEach((err) => console.error(err));
      }
    };

    const validateAndRefreshToken = async () => {
      const authenticationToken = authenticationTokenCookie.value();
      const refreshToken = refreshTokenCookie.value();

      let secondsTillRefresh = await getSecondsTillRefresh(authenticationToken);

      // If the tokens shoud be refresh now, do so
      if (secondsTillRefresh === 0) {
        // A new token should be valid for an hour so refresh it in 50 minutes
        secondsTillRefresh = 60 * 50;

        if (refreshToken) {
          refreshTokens(refreshToken);
        }
      }

      // Recall this function when the next refresh should happen
      timeoutId = setTimeout(
        validateAndRefreshToken,
        secondsTillRefresh * 1000
      );
    };

    validateAndRefreshToken();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const currentUserObject = useMemo(
    () => ({
      currentUser,
      currentCompanyId,
      currentCompany,
      currentCompanyUser,
      isAdminUser,
      isCompany,
      userCompanyRoles,

      setCurrentUser,
      setCurrentCompanyId,

      refetchMe,
    }),
    [currentUser, currentCompanyId]
  );

  return (
    <CurrentUserContext.Provider value={currentUserObject}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
