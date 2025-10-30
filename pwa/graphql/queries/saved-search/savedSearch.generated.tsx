import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SavedSearchQueryVariables = Types.Exact<{
  where: Types.SavedSearchFindUniqueInput;
  markAsViewed?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;

export type SavedSearchQuery = {
  __typename?: 'Query';
  savedSearch?: {
    __typename?: 'SavedSearch';
    id: string;
    minHoursPerWeek?: number | null;
    maxHoursPerWeek?: number | null;
    noMatchingIntermediaries: boolean;
    batchAlert: boolean;
    instantAlert: boolean;
    searchTags?: string | null;
    locations?: string | null;
    onLocation: boolean;
    description: string;
    expertises?: string | null;
  } | null;
};

export const SavedSearchDocument = gql`
  query savedSearch(
    $where: SavedSearchFindUniqueInput!
    $markAsViewed: Boolean
  ) {
    savedSearch(where: $where, markAsViewed: $markAsViewed) {
      id
      minHoursPerWeek
      maxHoursPerWeek
      noMatchingIntermediaries
      batchAlert
      instantAlert
      searchTags
      locations
      onLocation
      description
      expertises
    }
  }
`;

/**
 * __useSavedSearchQuery__
 *
 * To run a query within a React component, call `useSavedSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSavedSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSavedSearchQuery({
 *   variables: {
 *      where: // value for 'where'
 *      markAsViewed: // value for 'markAsViewed'
 *   },
 * });
 */
export function useSavedSearchQuery(
  baseOptions: Apollo.QueryHookOptions<
    SavedSearchQuery,
    SavedSearchQueryVariables
  > &
    (
      | { variables: SavedSearchQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SavedSearchQuery, SavedSearchQueryVariables>(
    SavedSearchDocument,
    options
  );
}
export function useSavedSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SavedSearchQuery,
    SavedSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SavedSearchQuery, SavedSearchQueryVariables>(
    SavedSearchDocument,
    options
  );
}
export function useSavedSearchSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SavedSearchQuery,
    SavedSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SavedSearchQuery, SavedSearchQueryVariables>(
    SavedSearchDocument,
    options
  );
}
export type SavedSearchQueryHookResult = ReturnType<typeof useSavedSearchQuery>;
export type SavedSearchLazyQueryHookResult = ReturnType<
  typeof useSavedSearchLazyQuery
>;
export type SavedSearchSuspenseQueryHookResult = ReturnType<
  typeof useSavedSearchSuspenseQuery
>;
export type SavedSearchQueryResult = Apollo.QueryResult<
  SavedSearchQuery,
  SavedSearchQueryVariables
>;
