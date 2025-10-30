import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteSavedSearchMutationVariables = Types.Exact<{
  where: Types.SavedSearchFindUniqueInput;
}>;

export type DeleteSavedSearchMutation = {
  __typename?: 'Mutation';
  deleteSavedSearch: boolean;
};

export const DeleteSavedSearchDocument = gql`
  mutation DeleteSavedSearch($where: SavedSearchFindUniqueInput!) {
    deleteSavedSearch(where: $where)
  }
`;
export type DeleteSavedSearchMutationFn = Apollo.MutationFunction<
  DeleteSavedSearchMutation,
  DeleteSavedSearchMutationVariables
>;

/**
 * __useDeleteSavedSearchMutation__
 *
 * To run a mutation, you first call `useDeleteSavedSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSavedSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSavedSearchMutation, { data, loading, error }] = useDeleteSavedSearchMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteSavedSearchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSavedSearchMutation,
    DeleteSavedSearchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteSavedSearchMutation,
    DeleteSavedSearchMutationVariables
  >(DeleteSavedSearchDocument, options);
}
export type DeleteSavedSearchMutationHookResult = ReturnType<
  typeof useDeleteSavedSearchMutation
>;
export type DeleteSavedSearchMutationResult =
  Apollo.MutationResult<DeleteSavedSearchMutation>;
export type DeleteSavedSearchMutationOptions = Apollo.BaseMutationOptions<
  DeleteSavedSearchMutation,
  DeleteSavedSearchMutationVariables
>;
