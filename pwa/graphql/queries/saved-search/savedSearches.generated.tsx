import * as Types from '../../types';

import { gql } from '@apollo/client';
import { SavedSearchFragmentDoc } from '../../fragments/savedSearchFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SavedSearchesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SavedSearchWhereInput>;
  orderBy?: Types.InputMaybe<
    | Array<Types.SavedSearchOrderByWithRelationInput>
    | Types.SavedSearchOrderByWithRelationInput
  >;
}>;

export type SavedSearchesQuery = {
  __typename?: 'Query';
  savedSearches: Array<{
    __typename?: 'SavedSearch';
    id: string;
    description: string;
    batchAlert: boolean;
    instantAlert: boolean;
    lastViewedAt: any;
    updatedAt: any;
    newMatchesCount: number;
    searchTags?: string | null;
    expertises?: string | null;
    locations?: string | null;
    onLocation: boolean;
    noMatchingIntermediaries: boolean;
    minHoursPerWeek?: number | null;
    maxHoursPerWeek?: number | null;
  }>;
};

export const SavedSearchesDocument = gql`
  query savedSearches(
    $where: SavedSearchWhereInput
    $orderBy: [SavedSearchOrderByWithRelationInput!]
  ) {
    savedSearches(where: $where, orderBy: $orderBy) {
      ...savedSearchFragment
    }
  }
  ${SavedSearchFragmentDoc}
`;

/**
 * __useSavedSearchesQuery__
 *
 * To run a query within a React component, call `useSavedSearchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSavedSearchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSavedSearchesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSavedSearchesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SavedSearchesQuery,
    SavedSearchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SavedSearchesQuery, SavedSearchesQueryVariables>(
    SavedSearchesDocument,
    options
  );
}
export function useSavedSearchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SavedSearchesQuery,
    SavedSearchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SavedSearchesQuery, SavedSearchesQueryVariables>(
    SavedSearchesDocument,
    options
  );
}
export function useSavedSearchesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SavedSearchesQuery,
    SavedSearchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SavedSearchesQuery,
    SavedSearchesQueryVariables
  >(SavedSearchesDocument, options);
}
export type SavedSearchesQueryHookResult = ReturnType<
  typeof useSavedSearchesQuery
>;
export type SavedSearchesLazyQueryHookResult = ReturnType<
  typeof useSavedSearchesLazyQuery
>;
export type SavedSearchesSuspenseQueryHookResult = ReturnType<
  typeof useSavedSearchesSuspenseQuery
>;
export type SavedSearchesQueryResult = Apollo.QueryResult<
  SavedSearchesQuery,
  SavedSearchesQueryVariables
>;
