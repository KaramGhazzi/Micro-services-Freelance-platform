import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestEmailChangeAdminMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  email: Types.Scalars['String']['input'];
}>;

export type RequestEmailChangeAdminMutation = {
  __typename?: 'Mutation';
  requestEmailChangeAdmin: {
    __typename?: 'RequestInvitationOutput';
    success: boolean;
  };
};

export const RequestEmailChangeAdminDocument = gql`
  mutation RequestEmailChangeAdmin($userId: Int!, $email: String!) {
    requestEmailChangeAdmin(userId: $userId, email: $email) {
      success
    }
  }
`;
export type RequestEmailChangeAdminMutationFn = Apollo.MutationFunction<
  RequestEmailChangeAdminMutation,
  RequestEmailChangeAdminMutationVariables
>;

/**
 * __useRequestEmailChangeAdminMutation__
 *
 * To run a mutation, you first call `useRequestEmailChangeAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestEmailChangeAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestEmailChangeAdminMutation, { data, loading, error }] = useRequestEmailChangeAdminMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestEmailChangeAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestEmailChangeAdminMutation,
    RequestEmailChangeAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestEmailChangeAdminMutation,
    RequestEmailChangeAdminMutationVariables
  >(RequestEmailChangeAdminDocument, options);
}
export type RequestEmailChangeAdminMutationHookResult = ReturnType<
  typeof useRequestEmailChangeAdminMutation
>;
export type RequestEmailChangeAdminMutationResult =
  Apollo.MutationResult<RequestEmailChangeAdminMutation>;
export type RequestEmailChangeAdminMutationOptions = Apollo.BaseMutationOptions<
  RequestEmailChangeAdminMutation,
  RequestEmailChangeAdminMutationVariables
>;
