import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RefreshSessionMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars['String']['input'];
}>;

export type RefreshSessionMutation = {
  __typename?: 'Mutation';
  refreshSession: {
    __typename?: 'LoginOutput';
    idToken: string;
    refreshToken: string;
  };
};

export const RefreshSessionDocument = gql`
  mutation refreshSession($refreshToken: String!) {
    refreshSession(refreshToken: $refreshToken) {
      idToken
      refreshToken
    }
  }
`;
export type RefreshSessionMutationFn = Apollo.MutationFunction<
  RefreshSessionMutation,
  RefreshSessionMutationVariables
>;

/**
 * __useRefreshSessionMutation__
 *
 * To run a mutation, you first call `useRefreshSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshSessionMutation, { data, loading, error }] = useRefreshSessionMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshSessionMutation,
    RefreshSessionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshSessionMutation,
    RefreshSessionMutationVariables
  >(RefreshSessionDocument, options);
}
export type RefreshSessionMutationHookResult = ReturnType<
  typeof useRefreshSessionMutation
>;
export type RefreshSessionMutationResult =
  Apollo.MutationResult<RefreshSessionMutation>;
export type RefreshSessionMutationOptions = Apollo.BaseMutationOptions<
  RefreshSessionMutation,
  RefreshSessionMutationVariables
>;
