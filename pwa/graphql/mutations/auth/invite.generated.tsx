import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  userCompanyRole: Types.Scalars['String']['input'];
  message: Types.Scalars['String']['input'];
}>;

export type InviteMutation = {
  __typename?: 'Mutation';
  invite: { __typename?: 'InviteOutput'; success: string };
};

export const InviteDocument = gql`
  mutation Invite(
    $email: String!
    $userCompanyRole: String!
    $message: String!
  ) {
    invite(
      email: $email
      userCompanyRole: $userCompanyRole
      message: $message
    ) {
      success
    }
  }
`;
export type InviteMutationFn = Apollo.MutationFunction<
  InviteMutation,
  InviteMutationVariables
>;

/**
 * __useInviteMutation__
 *
 * To run a mutation, you first call `useInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMutation, { data, loading, error }] = useInviteMutation({
 *   variables: {
 *      email: // value for 'email'
 *      userCompanyRole: // value for 'userCompanyRole'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useInviteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteMutation,
    InviteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InviteMutation, InviteMutationVariables>(
    InviteDocument,
    options
  );
}
export type InviteMutationHookResult = ReturnType<typeof useInviteMutation>;
export type InviteMutationResult = Apollo.MutationResult<InviteMutation>;
export type InviteMutationOptions = Apollo.BaseMutationOptions<
  InviteMutation,
  InviteMutationVariables
>;
