import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;

export type ConfirmMutation = {
  __typename?: 'Mutation';
  confirm: {
    __typename?: 'ConfirmOutput';
    idToken: string;
    refreshToken: string;
    permissionsByCompany: Array<{
      __typename?: 'PermissionsByCompanyId';
      companyId: number;
      permissions: Array<string>;
    }>;
  };
};

export const ConfirmDocument = gql`
  mutation Confirm($token: String!) {
    confirm(token: $token) {
      idToken
      refreshToken
      permissionsByCompany {
        companyId
        permissions
      }
    }
  }
`;
export type ConfirmMutationFn = Apollo.MutationFunction<
  ConfirmMutation,
  ConfirmMutationVariables
>;

/**
 * __useConfirmMutation__
 *
 * To run a mutation, you first call `useConfirmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmMutation, { data, loading, error }] = useConfirmMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmMutation,
    ConfirmMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmMutation, ConfirmMutationVariables>(
    ConfirmDocument,
    options
  );
}
export type ConfirmMutationHookResult = ReturnType<typeof useConfirmMutation>;
export type ConfirmMutationResult = Apollo.MutationResult<ConfirmMutation>;
export type ConfirmMutationOptions = Apollo.BaseMutationOptions<
  ConfirmMutation,
  ConfirmMutationVariables
>;
