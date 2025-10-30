import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResetMyUnreadNotificationCountMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ResetMyUnreadNotificationCountMutation = {
  __typename?: 'Mutation';
  resetMyUnreadNotificationCount: string;
};

export const ResetMyUnreadNotificationCountDocument = gql`
  mutation ResetMyUnreadNotificationCount {
    resetMyUnreadNotificationCount
  }
`;
export type ResetMyUnreadNotificationCountMutationFn = Apollo.MutationFunction<
  ResetMyUnreadNotificationCountMutation,
  ResetMyUnreadNotificationCountMutationVariables
>;

/**
 * __useResetMyUnreadNotificationCountMutation__
 *
 * To run a mutation, you first call `useResetMyUnreadNotificationCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetMyUnreadNotificationCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetMyUnreadNotificationCountMutation, { data, loading, error }] = useResetMyUnreadNotificationCountMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetMyUnreadNotificationCountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetMyUnreadNotificationCountMutation,
    ResetMyUnreadNotificationCountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResetMyUnreadNotificationCountMutation,
    ResetMyUnreadNotificationCountMutationVariables
  >(ResetMyUnreadNotificationCountDocument, options);
}
export type ResetMyUnreadNotificationCountMutationHookResult = ReturnType<
  typeof useResetMyUnreadNotificationCountMutation
>;
export type ResetMyUnreadNotificationCountMutationResult =
  Apollo.MutationResult<ResetMyUnreadNotificationCountMutation>;
export type ResetMyUnreadNotificationCountMutationOptions =
  Apollo.BaseMutationOptions<
    ResetMyUnreadNotificationCountMutation,
    ResetMyUnreadNotificationCountMutationVariables
  >;
