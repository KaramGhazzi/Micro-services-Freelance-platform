import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkNotificationsAsReadMutationVariables = Types.Exact<{
  where: Types.NotificationWhereInput;
}>;

export type MarkNotificationsAsReadMutation = {
  __typename?: 'Mutation';
  count: number;
};

export const MarkNotificationsAsReadDocument = gql`
  mutation MarkNotificationsAsRead($where: NotificationWhereInput!) {
    count: markNotificationsAsRead(where: $where)
  }
`;
export type MarkNotificationsAsReadMutationFn = Apollo.MutationFunction<
  MarkNotificationsAsReadMutation,
  MarkNotificationsAsReadMutationVariables
>;

/**
 * __useMarkNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationsAsReadMutation, { data, loading, error }] = useMarkNotificationsAsReadMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMarkNotificationsAsReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkNotificationsAsReadMutation,
    MarkNotificationsAsReadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkNotificationsAsReadMutation,
    MarkNotificationsAsReadMutationVariables
  >(MarkNotificationsAsReadDocument, options);
}
export type MarkNotificationsAsReadMutationHookResult = ReturnType<
  typeof useMarkNotificationsAsReadMutation
>;
export type MarkNotificationsAsReadMutationResult =
  Apollo.MutationResult<MarkNotificationsAsReadMutation>;
export type MarkNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<
  MarkNotificationsAsReadMutation,
  MarkNotificationsAsReadMutationVariables
>;
