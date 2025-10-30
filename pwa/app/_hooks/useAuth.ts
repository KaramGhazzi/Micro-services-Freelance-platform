import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import CurrentUserContext, {
  CurrentUser,
} from '../(dashboard)/_context/CurrentUserContext';
import deleteFilterStorage from '../_libs/deleteFilterStorage';
import {
  authenticationTokenCookie,
  refreshTokenCookie,
  companyIdCookie,
} from '../_libs/authCookies';
import { useLoginMutation } from '@/graphql/mutations/auth/login.generated';
import {
  RegisterMutationVariables,
  useRegisterMutation,
} from '@/graphql/mutations/auth/register.generated';
import { useConfirmMutation } from '@/graphql/mutations/users/confirm.generated';
import {
  ConfirmInviteMutationVariables,
  useConfirmInviteMutation,
} from '@/graphql/mutations/auth/confirmInvite.generated';
import { useResetPasswordMutation } from '@/graphql/mutations/auth/resetPassword.generated';
import { useSendPasswordResetEmailMutation } from '@/graphql/mutations/auth/sendPasswordResetEmail.generated';
import { useVerifyEmailChangeMutation } from '@/graphql/mutations/users/verifyEmailChange.generated';
import { useSavedSearchesQuery } from '@/graphql/queries/saved-search/savedSearches.generated';

export const useAuth = () => {
  const {
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
  } = useContext(CurrentUserContext);

  const [loginMutation, loginResult] = useLoginMutation();
  const [registerMutation, registerResult] = useRegisterMutation();
  const [confirmMutation, confirmResult] = useConfirmMutation();
  const [confirmInviteMutation, confirmInviteResult] =
    useConfirmInviteMutation();
  const [resetPasswordMutation, resetPasswordResult] =
    useResetPasswordMutation();
  const [sendPasswordResetEmailMutation, sendPasswordResetEmailResult] =
    useSendPasswordResetEmailMutation();
  const [verifyEmailChangeMutation, verifyEmailChangeResult] =
    useVerifyEmailChangeMutation();

  const { refetch: fetchSavedSearches } = useSavedSearchesQuery({ skip: true });

  const router = useRouter();
  const apolloClient = useApolloClient();

  // A small helper function to handle GraphQL errors
  const handleErrors = (response: {
    data?: {} | null;
    errors?: readonly GraphQLError[] | readonly GraphQLFormattedError[];
  }) => {
    if (response.errors?.length) {
      response.errors.forEach((err) => console.error(err));
      throw response.errors[0];
    }

    if (!response.data) {
      throw new Error('Response missing data');
    }
  };

  // A helper function to check if a single use token has already been used this session
  const hasAlreadyUsedToken = (key: string, token: string) => {
    if (typeof window === 'undefined') return false;

    return sessionStorage.getItem(key) === token;
  };

  // A helper function to mark that a single use token has been used this session
  const markTokenAsUsed = (key: string, token: string) => {
    if (typeof window === 'undefined') return;

    sessionStorage.setItem(key, token);
  };

  /**
   * Login the user using a email and password
   * @param email the user's email
   * @param password the user's password
   */
  const loginWithPassword = async (email: string, password: string) => {
    const response = await loginMutation({
      variables: {
        email,
        password,
      },
    });

    handleErrors(response);

    await loginWithToken(
      response.data?.login?.idToken,
      response.data?.login?.refreshToken
    );
  };

  /**
   * Login the user using a JWT token
   * @param idToken a string containing the JWT used to login
   * @param refreshToken a string containing the JWT used to refresh the session when the idToken has expired
   */
  const loginWithToken = async (
    idToken: string | undefined,
    refreshToken: string | undefined
  ) => {
    if (!idToken) throw new Error('Login missing idToken');

    // First set the correct cookies
    authenticationTokenCookie.update(idToken);
    if (refreshToken) {
      refreshTokenCookie.update(refreshToken);
    }

    // Incase the company id cookie is still around, remove it so the user is not immidiately logged in to that company
    companyIdCookie.delete();

    // Load the user data with the new cookies set
    // (Sets the currentUser state using an effect in the CurrentUserContext)
    const response = await refetchMe();

    handleErrors(response);
  };

  /**
   * Logs out the user
   * @param navigateToLogin should be navigated to the login page after logging out
   */
  const logout = async (navigateToLogin = true) => {
    // Remove all the cookies related to auth
    authenticationTokenCookie.delete();
    refreshTokenCookie.delete();
    companyIdCookie.delete();

    // Remove the internal user data
    setCurrentUser(undefined);
    setCurrentCompanyId(undefined);

    // Remove stored filter data
    deleteFilterStorage();

    // Clear the cache of apollo so it won't return data from previous logins
    apolloClient.clearStore();

    if (navigateToLogin) {
      router.push('/inloggen');
    }
  };

  /**
   * Switch the users login to an other company.
   * @param companyId the ID of the company
   * @param fetchedUser the user to use available companies from, takes the currentUser by default. (This is useful if you want call this function directly after loging in since currentUser doesn't instantly update)
   */
  const switchCompany = async (
    companyId: string,
    fetchedUser?: CurrentUser
  ) => {
    const user = fetchedUser ?? currentUser;
    if (!user) throw new Error('Missing user');

    // Check if the user is part of this company
    if (
      !user?.userCompanies?.some((userCompany) => {
        return userCompany?.company?.id === companyId;
      })
    ) {
      throw new Error('Company not found');
    }

    // Store the new id in the state, cookie and localstorage
    companyIdCookie.update(companyId);
    setCurrentCompanyId(companyId);

    // If user company only has one savedsearch pre-select it for a search
    if (typeof window !== 'undefined') {
      const response = await fetchSavedSearches();

      handleErrors(response);

      if (response?.data?.savedSearches?.length === 1) {
        sessionStorage.setItem(
          'savedSearch',
          response.data.savedSearches[0].id
        );
      }
    }
  };

  /**
   * Creates a new account and sends a email to verify the user
   * @param data the registration user data
   */
  const register = async (data: RegisterMutationVariables) => {
    const response = await registerMutation({
      variables: data,
    });

    handleErrors(response);

    if (response.data?.register.success !== 'true') {
      throw new Error('Unkown register error');
    }
  };

  /**
   * Using a registration token verify the user and log them in
   * @param registrationToken the registration token usually provided in a link sent to the user
   */
  const confirmRegister = async (registrationToken: string) => {
    const usedTokenKey = 'usedRegistrationToken';
    if (hasAlreadyUsedToken(usedTokenKey, registrationToken)) return;

    const response = await confirmMutation({
      variables: { token: registrationToken },
    });

    handleErrors(response);

    markTokenAsUsed(usedTokenKey, registrationToken);

    // Login using the token sent by confirm mutation
    loginWithToken(
      response.data?.confirm?.idToken,
      response.data?.confirm?.refreshToken
    );
  };

  /**
   * Using an invitation token register the user as a employee of the corresponding token and then logout
   * @param inviteToken the invitation token usually provided in a link sent to the user
   * @param data the registration user data
   */
  const confirmInvitation = async (
    inviteToken: string,
    data: Omit<ConfirmInviteMutationVariables, 'inviteToken'>
  ) => {
    const usedTokenKey = 'usedInviteToken';
    if (hasAlreadyUsedToken(usedTokenKey, inviteToken)) return;

    const response = await confirmInviteMutation({
      variables: {
        ...data,
        inviteToken,
      },
    });

    handleErrors(response);

    markTokenAsUsed(usedTokenKey, inviteToken);

    // Since confirm invite mutation doesn't provide a login token, just logout
    logout(false);
  };

  /**
   * Send an email to the given address containing a request to reset the password
   * @param email the address to send the email to
   */
  const forgotPassword = async (email: string) => {
    const response = await sendPasswordResetEmailMutation({
      variables: {
        email,
      },
    });

    handleErrors(response);

    if (response.data?.sendPasswordResetEmail?.success !== 'true') {
      throw new Error('Unkown forgot password error');
    }
  };

  /**
   * Using a reset password token reset a users password and log them in
   * @param passwordResetToken the reset password token usually provided in a link sent to the user
   * @param password the new password
   */
  const resetPassword = async (
    passwordResetToken: string,
    password: string
  ) => {
    const usedTokenKey = 'usedPasswordResetToken';
    if (hasAlreadyUsedToken(usedTokenKey, passwordResetToken)) return;

    const response = await resetPasswordMutation({
      variables: {
        token: passwordResetToken,
        password,
      },
    });

    handleErrors(response);

    markTokenAsUsed(usedTokenKey, passwordResetToken);

    // TODO: fix in backend
    loginWithToken(response.data?.resetPassword?.token, undefined);
  };

  /**
   * Confirm chaning the users email
   * @param changeEmailToken The token for changing the email
   * @param password the users password to verify
   */
  const changeEmail = async (changeEmailToken: string, password: string) => {
    const usedTokenKey = 'usedChangeEmailToken';
    if (hasAlreadyUsedToken(usedTokenKey, changeEmailToken)) return;

    const response = await verifyEmailChangeMutation({
      variables: {
        token: changeEmailToken,
        password,
      },
    });

    handleErrors(response);

    markTokenAsUsed(usedTokenKey, changeEmailToken);

    // Login using the token sent by verify email change mutation
    loginWithToken(
      response?.data?.verifyEmailChange?.idToken,
      response?.data?.verifyEmailChange?.refreshToken
    );
  };

  return {
    loginWithPassword,
    loginWithToken,
    logout,
    switchCompany,

    register,
    confirmRegister,
    confirmInvitation,
    forgotPassword,
    resetPassword,
    changeEmail,

    loading:
      loginResult.loading ||
      registerResult.loading ||
      confirmResult.loading ||
      confirmInviteResult.loading ||
      resetPasswordResult.loading ||
      sendPasswordResetEmailResult.loading ||
      verifyEmailChangeResult.loading,
    error:
      loginResult.error ??
      registerResult.error ??
      confirmResult.error ??
      confirmInviteResult.error ??
      resetPasswordResult.error ??
      sendPasswordResetEmailResult.error ??
      verifyEmailChangeResult.error,

    currentUser,
    currentCompanyId,
    currentCompany,
    currentCompanyUser,
    isAdminUser,
    isCompany,
    userCompanyRoles,

    refetchMe,
  };
};
