import { GraphQLError } from 'graphql/error';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  authenticationTokenCookie,
  companyIdCookie,
  refreshTokenCookie,
} from '../_libs/authCookies';
import deleteFilterStorage from '../_libs/deleteFilterStorage';
import { useAuth } from '@/app/_hooks/useAuth';
import { useLoginMutation } from '@/graphql/mutations/auth/login.generated';
import { useRegisterMutation } from '@/graphql/mutations/auth/register.generated';
import { useConfirmMutation } from '@/graphql/mutations/users/confirm.generated';
import { useConfirmInviteMutation } from '@/graphql/mutations/auth/confirmInvite.generated';
import { useResetPasswordMutation } from '@/graphql/mutations/auth/resetPassword.generated';
import { useSendPasswordResetEmailMutation } from '@/graphql/mutations/auth/sendPasswordResetEmail.generated';
import { useVerifyEmailChangeMutation } from '@/graphql/mutations/users/verifyEmailChange.generated';

global.console = {
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
} as any;

jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

jest.mock('react', () => {
  const react = jest.requireActual('react');
  return {
    ...react,
    useContext: jest.fn(),
  };
});
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));
jest.mock('@apollo/client', () => {
  const apollo = jest.requireActual('@apollo/client');
  return {
    ...apollo,
    useMutation: jest.fn(),
    useApolloClient: jest.fn().mockReturnValue({
      clearStore: jest.fn(),
    }),
  };
});

jest.mock('@package/fbjwt', () => ({}));

jest.mock('../_libs/authCookies', () => ({
  authenticationTokenCookie: { update: jest.fn(), delete: jest.fn() },
  refreshTokenCookie: { update: jest.fn(), delete: jest.fn() },
  companyIdCookie: { update: jest.fn(), delete: jest.fn() },
}));

jest.mock('@/graphql/mutations/auth/login.generated', () => ({
  useLoginMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));
jest.mock('@/graphql/mutations/auth/register.generated', () => ({
  useRegisterMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));
jest.mock('@/graphql/mutations/users/confirm.generated', () => ({
  useConfirmMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));
jest.mock('@/graphql/mutations/auth/confirmInvite.generated', () => ({
  useConfirmInviteMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));
jest.mock('@/graphql/mutations/auth/resetPassword.generated', () => ({
  useResetPasswordMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));
jest.mock('@/graphql/mutations/auth/sendPasswordResetEmail.generated', () => ({
  useSendPasswordResetEmailMutation: jest.fn(() => [
    jest.fn(),
    { loading: false },
  ]),
}));
jest.mock('@/graphql/mutations/users/verifyEmailChange.generated', () => ({
  useVerifyEmailChangeMutation: jest.fn(() => [jest.fn(), { loading: false }]),
}));

const fetchSavedSearches = jest.fn().mockReturnValue({
  data: { savedSearches: [] },
  errors: [],
});
jest.mock('@/graphql/queries/saved-search/savedSearches.generated', () => ({
  useSavedSearchesQuery: jest.fn(() => ({
    refetch: fetchSavedSearches,
  })),
}));

jest.mock('../_libs/deleteFilterStorage');

describe('useAuth', () => {
  const setCurrentUser = jest.fn();
  const setCurrentCompanyId = jest.fn();
  const refetchMe = jest.fn(() =>
    Promise.resolve({
      data: {},
      errors: [] as GraphQLError[],
    })
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  (useContext as jest.Mock).mockReturnValue({
    currentUser: {},
    currentCompanyId: 1,
    currentCompany: {},
    currentCompanyUser: {},
    isAdminUser: false,
    isCompany: false,
    userCompanyRoles: [],

    setCurrentUser,
    setCurrentCompanyId,

    refetchMe,
  });

  it.each([
    // result, login, register, confirm, invite, reset, send, verify
    [false, false, false, false, false, false, false, false],
    [true, true, false, false, false, false, false, false],
    [true, false, true, false, false, false, false, false],
    [true, false, false, true, false, false, false, false],
    [true, false, false, false, true, false, false, false],
    [true, false, false, false, false, true, false, false],
    [true, false, false, false, false, false, true, false],
    [true, false, false, false, false, false, false, true],
    [true, true, true, true, true, true, true, true],
  ])(
    'returns loading %s state when login %s, register %s, confirm %s, invite %s, reset %s, send %s, and verify %s',
    (result, login, register, confirm, invite, reset, send, verify) => {
      (useLoginMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(),
        { loading: login },
      ]);
      (useRegisterMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(),
        { loading: register },
      ]);
      (useConfirmMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(),
        { loading: confirm },
      ]);
      (useConfirmInviteMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(),
        { loading: invite },
      ]);
      (useResetPasswordMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(),
        { loading: reset },
      ]);
      (useSendPasswordResetEmailMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(),
        { loading: send },
      ]);
      (useVerifyEmailChangeMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(),
        { loading: verify },
      ]);

      const { loading } = useAuth();
      expect(loading).toBe(result);
    }
  );

  describe('when logging in with password', () => {
    it('throws when the server returns errors', async () => {
      (useLoginMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(() =>
          Promise.resolve({
            errors: [new GraphQLError('We expect this to go wrong')],
          })
        ),
        { loading: false },
      ]);

      const { loginWithPassword } = useAuth();
      await expect(loginWithPassword('', '')).rejects.toThrow();
    });

    it('fetches a new user when logging in', async () => {
      (useLoginMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(() =>
          Promise.resolve({
            data: {
              login: {
                idToken: 'ID token',
                refreshToken: 'Refresh token',
              },
            },
          })
        ),
        { loading: false },
      ]);

      const { loginWithPassword } = useAuth();
      await loginWithPassword('', '');

      expect(authenticationTokenCookie.update).toBeCalledWith('ID token');
      expect(refreshTokenCookie.update).toBeCalledWith('Refresh token');
      expect(refetchMe).toBeCalled();
    });
  });
  describe('when logging in with token', () => {
    it('fetches a new user when logging in', async () => {
      const { loginWithToken } = useAuth();
      await loginWithToken('ID token', 'Refresh token');

      expect(authenticationTokenCookie.update).toBeCalledWith('ID token');
      expect(refreshTokenCookie.update).toBeCalledWith('Refresh token');
      expect(refetchMe).toBeCalled();
    });
    it('throws when the server returns errors', () => {
      refetchMe.mockReturnValueOnce(
        Promise.resolve({
          errors: [new GraphQLError('We expect this to go wrong')],
        })
      );

      const { loginWithToken } = useAuth();

      expect(loginWithToken('ID token', 'Refresh token')).rejects.toThrow();
    });
  });
  describe.each([
    { shouldRedirect: true, args: [true], name: 'with redirect' },
    { shouldRedirect: false, args: [false], name: 'without redirect' },
    { shouldRedirect: true, args: [], name: 'with default redirect' },
  ])('when logging out $name', ({ shouldRedirect, args }) => {
    it('should remove authentication cookie', async () => {
      const { logout } = useAuth();

      await logout(...args);

      expect(authenticationTokenCookie.delete).toBeCalled();
    });

    it('should remove refresh cookie', async () => {
      const { logout } = useAuth();

      await logout(...args);

      expect(refreshTokenCookie.delete).toBeCalled();
    });

    it('should remove company id cookie', async () => {
      const { logout } = useAuth();

      await logout(...args);

      expect(companyIdCookie.delete).toBeCalled();
    });

    it('should set user and company to undefined', async () => {
      const { logout } = useAuth();

      await logout(...args);

      expect(setCurrentUser).toBeCalledWith(undefined);
      expect(setCurrentCompanyId).toBeCalledWith(undefined);
    });

    it('should delete the filter storage', async () => {
      const { logout } = useAuth();

      await logout(...args);

      expect(deleteFilterStorage).toBeCalled();
    });

    it('should clear the apollo cache', async () => {
      const { logout } = useAuth();
      const apolloClient = useApolloClient();

      await logout(...args);

      expect(apolloClient.clearStore).toBeCalled();
    });

    if (shouldRedirect) {
      it('should redirect', async () => {
        const { logout } = useAuth();
        const router = useRouter();

        await logout(...args);

        expect(router.push).toBeCalled();
      });
    } else {
      it('should not redirect', async () => {
        const { logout } = useAuth();
        const router = useRouter();

        await logout(...args);

        expect(router.push).toBeCalledTimes(0);
      });
    }
  });

  describe('switch company', () => {
    const mockCompanyId = '1';
    const mockUser = {
      userCompanies: [{ company: { id: '1' } }, { company: { id: '2' } }],
    };

    it('throws an error if user is missing', async () => {
      (useContext as jest.Mock).mockReturnValueOnce({
        ...useContext(null as any),
        currentUser: null,
      });

      const { switchCompany } = useAuth();

      await expect(switchCompany(mockCompanyId)).rejects.toThrowError(
        'Missing user'
      );
    });

    it('throws an error if the company is not found in userCompanies', async () => {
      (useContext as jest.Mock).mockReturnValueOnce({
        currentUser: {
          userCompanies: [{ company: { id: '2' } }],
        },
        ...useContext(null as any),
      });

      const { switchCompany } = useAuth();

      await expect(switchCompany('1')).rejects.toThrow('Company not found');
    });
    it('updates companyId in cookie and state', async () => {
      (useContext as jest.Mock).mockReturnValueOnce({
        ...useContext(null as any),
        currentUser: mockUser,
      });

      const { switchCompany } = useAuth();

      await switchCompany(mockCompanyId);

      expect(companyIdCookie.update).toHaveBeenCalledWith(mockCompanyId);
      expect(setCurrentCompanyId).toHaveBeenCalledWith(mockCompanyId);
    });

    it('sets the saved search in sessionStorage if there is only one saved search', async () => {
      (useContext as jest.Mock).mockReturnValueOnce({
        ...useContext(null as any),
        currentUser: mockUser,
      });

      (fetchSavedSearches as jest.Mock).mockReturnValueOnce({
        data: { savedSearches: [{ id: '10' }] },
        errors: [],
      });

      const { switchCompany } = useAuth();

      await switchCompany(mockCompanyId);

      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        'savedSearch',
        '10'
      );
    });

    it('does not set saved search if there are multiple saved searches', async () => {
      (useContext as jest.Mock).mockReturnValueOnce({
        ...useContext(null as any),
        currentUser: mockUser,
      });

      const { switchCompany } = useAuth();
      (fetchSavedSearches as jest.Mock).mockResolvedValue({
        data: { savedSearches: [{ id: 'search123' }, { id: 'search456' }] },
        errors: [],
      });

      await switchCompany(mockCompanyId);

      expect(window.sessionStorage.setItem).not.toHaveBeenCalled();
    });

    it('logs errors and throws the first error if fetchSavedSearches returns errors', async () => {
      (useContext as jest.Mock).mockReturnValueOnce({
        ...useContext(null as any),
        currentUser: mockUser,
      });

      const mockError = new Error('Some error');
      (fetchSavedSearches as jest.Mock).mockResolvedValue({
        data: null,
        errors: [mockError],
      });

      const { switchCompany } = useAuth();

      await expect(switchCompany(mockCompanyId)).rejects.toThrow(mockError);
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe('when registering a user', () => {
    it('throws when the server returns errors', async () => {
      (useRegisterMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(() =>
          Promise.resolve({
            errors: [new GraphQLError('Registration failed')],
          })
        ),
        { loading: false },
      ]);

      const { register } = useAuth();
      await expect(register({} as any)).rejects.toThrow('Registration failed');
    });

    it('does not throw when registration is successful', async () => {
      (useRegisterMutation as jest.Mock).mockReturnValueOnce([
        jest.fn(() =>
          Promise.resolve({
            data: { register: { success: 'true' } },
            errors: [],
          })
        ),
        { loading: false },
      ]);

      const { register } = useAuth();
      await expect(register({} as any)).resolves.not.toThrow();
    });
  });
});
