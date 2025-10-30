import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyEmailChangeMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type VerifyEmailChangeMutation = {
  __typename?: 'Mutation';
  verifyEmailChange: {
    __typename?: 'LoginOutput';
    idToken: string;
    refreshToken: string;
    permissionsByCompany: Array<{
      __typename?: 'PermissionsByCompanyId';
      companyId: number;
      permissions: Array<string>;
    }>;
  };
};

export const VerifyEmailChangeDocument = gql`
  mutation VerifyEmailChange($token: String!, $password: String!) {
    verifyEmailChange(token: $token, password: $password) {
      idToken
      refreshToken
      permissionsByCompany {
        companyId
        permissions
      }
    }
  }
`;
export type VerifyEmailChangeMutationFn = Apollo.MutationFunction<
  VerifyEmailChangeMutation,
  VerifyEmailChangeMutationVariables
>;

/**
 * __useVerifyEmailChangeMutation__
 *
 * To run a mutation, you first call `useVerifyEmailChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailChangeMutation, { data, loading, error }] = useVerifyEmailChangeMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useVerifyEmailChangeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyEmailChangeMutation,
    VerifyEmailChangeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    VerifyEmailChangeMutation,
    VerifyEmailChangeMutationVariables
  >(VerifyEmailChangeDocument, options);
}
export type VerifyEmailChangeMutationHookResult = ReturnType<
  typeof useVerifyEmailChangeMutation
>;
export type VerifyEmailChangeMutationResult =
  Apollo.MutationResult<VerifyEmailChangeMutation>;
export type VerifyEmailChangeMutationOptions = Apollo.BaseMutationOptions<
  VerifyEmailChangeMutation,
  VerifyEmailChangeMutationVariables
>;
