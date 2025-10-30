import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendPasswordResetEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;

export type SendPasswordResetEmailMutation = {
  __typename?: 'Mutation';
  sendPasswordResetEmail: {
    __typename?: 'PasswordForgetOutput';
    success: string;
  };
};

export const SendPasswordResetEmailDocument = gql`
  mutation SendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
    }
  }
`;
export type SendPasswordResetEmailMutationFn = Apollo.MutationFunction<
  SendPasswordResetEmailMutation,
  SendPasswordResetEmailMutationVariables
>;

/**
 * __useSendPasswordResetEmailMutation__
 *
 * To run a mutation, you first call `useSendPasswordResetEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordResetEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordResetEmailMutation, { data, loading, error }] = useSendPasswordResetEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendPasswordResetEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendPasswordResetEmailMutation,
    SendPasswordResetEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendPasswordResetEmailMutation,
    SendPasswordResetEmailMutationVariables
  >(SendPasswordResetEmailDocument, options);
}
export type SendPasswordResetEmailMutationHookResult = ReturnType<
  typeof useSendPasswordResetEmailMutation
>;
export type SendPasswordResetEmailMutationResult =
  Apollo.MutationResult<SendPasswordResetEmailMutation>;
export type SendPasswordResetEmailMutationOptions = Apollo.BaseMutationOptions<
  SendPasswordResetEmailMutation,
  SendPasswordResetEmailMutationVariables
>;
