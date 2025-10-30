import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmInviteMutationVariables = Types.Exact<{
  inviteToken: Types.Scalars['String']['input'];
  firstName: Types.Scalars['String']['input'];
  lastName: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  phoneNumber: Types.Scalars['String']['input'];
  privacySettings: Types.PrivacySettings;
}>;

export type ConfirmInviteMutation = {
  __typename?: 'Mutation';
  confirmInvite: {
    __typename?: 'ConfirmInviteOutput';
    idToken: string;
    refreshToken: string;
    permissionsByCompany: Array<{
      __typename?: 'PermissionsByCompanyId';
      companyId: number;
      permissions: Array<string>;
    }>;
  };
};

export const ConfirmInviteDocument = gql`
  mutation ConfirmInvite(
    $inviteToken: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phoneNumber: String!
    $privacySettings: PrivacySettings!
  ) {
    confirmInvite(
      inviteToken: $inviteToken
      firstName: $firstName
      lastName: $lastName
      password: $password
      phoneNumber: $phoneNumber
      privacySettings: $privacySettings
    ) {
      idToken
      refreshToken
      permissionsByCompany {
        companyId
        permissions
      }
    }
  }
`;
export type ConfirmInviteMutationFn = Apollo.MutationFunction<
  ConfirmInviteMutation,
  ConfirmInviteMutationVariables
>;

/**
 * __useConfirmInviteMutation__
 *
 * To run a mutation, you first call `useConfirmInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmInviteMutation, { data, loading, error }] = useConfirmInviteMutation({
 *   variables: {
 *      inviteToken: // value for 'inviteToken'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *      phoneNumber: // value for 'phoneNumber'
 *      privacySettings: // value for 'privacySettings'
 *   },
 * });
 */
export function useConfirmInviteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmInviteMutation,
    ConfirmInviteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmInviteMutation,
    ConfirmInviteMutationVariables
  >(ConfirmInviteDocument, options);
}
export type ConfirmInviteMutationHookResult = ReturnType<
  typeof useConfirmInviteMutation
>;
export type ConfirmInviteMutationResult =
  Apollo.MutationResult<ConfirmInviteMutation>;
export type ConfirmInviteMutationOptions = Apollo.BaseMutationOptions<
  ConfirmInviteMutation,
  ConfirmInviteMutationVariables
>;
