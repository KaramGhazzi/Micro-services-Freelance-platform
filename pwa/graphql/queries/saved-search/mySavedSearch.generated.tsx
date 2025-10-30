import * as Types from '../../types';

import { gql } from '@apollo/client';
import { SavedSearchFragmentDoc } from '../../fragments/savedSearchFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MySavedSearchesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SavedSearchWhereInput>;
  orderBy?: Types.InputMaybe<
    | Array<Types.SavedSearchOrderByWithRelationInput>
    | Types.SavedSearchOrderByWithRelationInput
  >;
}>;

export type MySavedSearchesQuery = {
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

export const MySavedSearchesDocument = gql`
  query mySavedSearches(
    $where: SavedSearchWhereInput
    $orderBy: [SavedSearchOrderByWithRelationInput!]
  ) {
    savedSearches: mySavedSearches(where: $where, orderBy: $orderBy) {
      ...savedSearchFragment
    }
  }
  ${SavedSearchFragmentDoc}
`;

/**
 * __useMySavedSearchesQuery__
 *
 * To run a query within a React component, call `useMySavedSearchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySavedSearchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySavedSearchesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useMySavedSearchesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MySavedSearchesQuery,
    MySavedSearchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MySavedSearchesQuery, MySavedSearchesQueryVariables>(
    MySavedSearchesDocument,
    options
  );
}
export function useMySavedSearchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MySavedSearchesQuery,
    MySavedSearchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MySavedSearchesQuery,
    MySavedSearchesQueryVariables
  >(MySavedSearchesDocument, options);
}
export function useMySavedSearchesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    MySavedSearchesQuery,
    MySavedSearchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MySavedSearchesQuery,
    MySavedSearchesQueryVariables
  >(MySavedSearchesDocument, options);
}
export type MySavedSearchesQueryHookResult = ReturnType<
  typeof useMySavedSearchesQuery
>;
export type MySavedSearchesLazyQueryHookResult = ReturnType<
  typeof useMySavedSearchesLazyQuery
>;
export type MySavedSearchesSuspenseQueryHookResult = ReturnType<
  typeof useMySavedSearchesSuspenseQuery
>;
export type MySavedSearchesQueryResult = Apollo.QueryResult<
  MySavedSearchesQuery,
  MySavedSearchesQueryVariables
>;
