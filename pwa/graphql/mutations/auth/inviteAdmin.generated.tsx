import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteAdminMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  userCompanyRole: Types.Scalars['String']['input'];
  message: Types.Scalars['String']['input'];
  companyId: Types.Scalars['Float']['input'];
}>;

export type InviteAdminMutation = {
  __typename?: 'Mutation';
  invite: { __typename?: 'InviteOutput'; success: string };
};

export const InviteAdminDocument = gql`
  mutation InviteAdmin(
    $email: String!
    $userCompanyRole: String!
    $message: String!
    $companyId: Float!
  ) {
    invite: inviteAdmin(
      email: $email
      userCompanyRole: $userCompanyRole
      message: $message
      companyId: $companyId
    ) {
      success
    }
  }
`;
export type InviteAdminMutationFn = Apollo.MutationFunction<
  InviteAdminMutation,
  InviteAdminMutationVariables
>;

/**
 * __useInviteAdminMutation__
 *
 * To run a mutation, you first call `useInviteAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteAdminMutation, { data, loading, error }] = useInviteAdminMutation({
 *   variables: {
 *      email: // value for 'email'
 *      userCompanyRole: // value for 'userCompanyRole'
 *      message: // value for 'message'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useInviteAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteAdminMutation,
    InviteAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InviteAdminMutation, InviteAdminMutationVariables>(
    InviteAdminDocument,
    options
  );
}
export type InviteAdminMutationHookResult = ReturnType<
  typeof useInviteAdminMutation
>;
export type InviteAdminMutationResult =
  Apollo.MutationResult<InviteAdminMutation>;
export type InviteAdminMutationOptions = Apollo.BaseMutationOptions<
  InviteAdminMutation,
  InviteAdminMutationVariables
>;
