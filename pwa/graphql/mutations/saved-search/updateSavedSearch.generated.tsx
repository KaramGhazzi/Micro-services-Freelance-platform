import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSavedSearchMutationVariables = Types.Exact<{
  data: Types.SavedSearchUpdateInput;
  where: Types.SavedSearchFindUniqueInput;
}>;

export type UpdateSavedSearchMutation = {
  __typename?: 'Mutation';
  updateSavedSearch: {
    __typename?: 'SavedSearch';
    id: string;
    description: string;
    batchAlert: boolean;
    instantAlert: boolean;
    lastViewedAt: any;
    newMatchesCount: number;
    searchTags?: string | null;
    expertises?: string | null;
    locations?: string | null;
    onLocation: boolean;
    noMatchingIntermediaries: boolean;
    minHoursPerWeek?: number | null;
    maxHoursPerWeek?: number | null;
    updatedAt: any;
  };
};

export const UpdateSavedSearchDocument = gql`
  mutation UpdateSavedSearch(
    $data: SavedSearchUpdateInput!
    $where: SavedSearchFindUniqueInput!
  ) {
    updateSavedSearch(data: $data, where: $where) {
      id
      description
      batchAlert
      instantAlert
      lastViewedAt
      newMatchesCount
      searchTags
      expertises
      locations
      onLocation
      noMatchingIntermediaries
      minHoursPerWeek
      maxHoursPerWeek
      updatedAt
    }
  }
`;
export type UpdateSavedSearchMutationFn = Apollo.MutationFunction<
  UpdateSavedSearchMutation,
  UpdateSavedSearchMutationVariables
>;

/**
 * __useUpdateSavedSearchMutation__
 *
 * To run a mutation, you first call `useUpdateSavedSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSavedSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSavedSearchMutation, { data, loading, error }] = useUpdateSavedSearchMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateSavedSearchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSavedSearchMutation,
    UpdateSavedSearchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSavedSearchMutation,
    UpdateSavedSearchMutationVariables
  >(UpdateSavedSearchDocument, options);
}
export type UpdateSavedSearchMutationHookResult = ReturnType<
  typeof useUpdateSavedSearchMutation
>;
export type UpdateSavedSearchMutationResult =
  Apollo.MutationResult<UpdateSavedSearchMutation>;
export type UpdateSavedSearchMutationOptions = Apollo.BaseMutationOptions<
  UpdateSavedSearchMutation,
  UpdateSavedSearchMutationVariables
>;
