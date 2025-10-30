import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveFavoriteMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type RemoveFavoriteMutation = {
  __typename?: 'Mutation';
  removeFavorite: { __typename?: 'UserFavorite'; id: string };
};

export const RemoveFavoriteDocument = gql`
  mutation RemoveFavorite($assignmentId: Int!) {
    removeFavorite(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type RemoveFavoriteMutationFn = Apollo.MutationFunction<
  RemoveFavoriteMutation,
  RemoveFavoriteMutationVariables
>;

/**
 * __useRemoveFavoriteMutation__
 *
 * To run a mutation, you first call `useRemoveFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFavoriteMutation, { data, loading, error }] = useRemoveFavoriteMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useRemoveFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveFavoriteMutation,
    RemoveFavoriteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveFavoriteMutation,
    RemoveFavoriteMutationVariables
  >(RemoveFavoriteDocument, options);
}
export type RemoveFavoriteMutationHookResult = ReturnType<
  typeof useRemoveFavoriteMutation
>;
export type RemoveFavoriteMutationResult =
  Apollo.MutationResult<RemoveFavoriteMutation>;
export type RemoveFavoriteMutationOptions = Apollo.BaseMutationOptions<
  RemoveFavoriteMutation,
  RemoveFavoriteMutationVariables
>;
