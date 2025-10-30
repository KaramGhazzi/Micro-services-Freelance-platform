import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestInvitationMutationVariables = Types.Exact<{
  cocNumber: Types.Scalars['String']['input'];
}>;

export type RequestInvitationMutation = {
  __typename?: 'Mutation';
  requestInvitation: {
    __typename?: 'RequestInvitationOutput';
    success: boolean;
  };
};

export const RequestInvitationDocument = gql`
  mutation RequestInvitation($cocNumber: String!) {
    requestInvitation(cocNumber: $cocNumber) {
      success
    }
  }
`;
export type RequestInvitationMutationFn = Apollo.MutationFunction<
  RequestInvitationMutation,
  RequestInvitationMutationVariables
>;

/**
 * __useRequestInvitationMutation__
 *
 * To run a mutation, you first call `useRequestInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestInvitationMutation, { data, loading, error }] = useRequestInvitationMutation({
 *   variables: {
 *      cocNumber: // value for 'cocNumber'
 *   },
 * });
 */
export function useRequestInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestInvitationMutation,
    RequestInvitationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestInvitationMutation,
    RequestInvitationMutationVariables
  >(RequestInvitationDocument, options);
}
export type RequestInvitationMutationHookResult = ReturnType<
  typeof useRequestInvitationMutation
>;
export type RequestInvitationMutationResult =
  Apollo.MutationResult<RequestInvitationMutation>;
export type RequestInvitationMutationOptions = Apollo.BaseMutationOptions<
  RequestInvitationMutation,
  RequestInvitationMutationVariables
>;
