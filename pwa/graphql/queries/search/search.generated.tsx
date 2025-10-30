import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchQueryVariables = Types.Exact<{
  query: Types.SearchQueryInput;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  showFavoritesOnly?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  sortMethod?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type SearchQuery = {
  __typename?: 'Query';
  search: {
    __typename?: 'SearchResponse';
    count: number;
    results: Array<{
      __typename?: 'SearchResult';
      docID: string;
      score: number;
      assignment: {
        __typename?: 'Assignment';
        id: string;
        title?: string | null;
        rateType?: Types.RateType | null;
        publishAt?: any | null;
        hideInDescription: boolean;
        viewsCount: number;
        commentsCount: number;
        status?: Types.AssignmentStatus | null;
        replied: boolean;
        uuid: string;
        type?: Types.AssignmentType | null;
        place?: string | null;
        companyId: number;
        description?: string | null;
        descriptionIsVisible: boolean;
        isRandomlyVisible: boolean;
        isRead: boolean;
        isFavorite: boolean;
        company: {
          __typename?: 'Company';
          id: string;
          name?: string | null;
          logoImageFile?: {
            __typename?: 'File';
            id: string;
            blobName: string;
            container: string;
          } | null;
        };
      };
    }>;
  };
};

export const SearchDocument = gql`
  query search(
    $query: SearchQueryInput!
    $limit: Int
    $offset: Int
    $showFavoritesOnly: Boolean
    $sortMethod: String
  ) {
    search(
      query: $query
      limit: $limit
      offset: $offset
      showFavoritesOnly: $showFavoritesOnly
      sortMethod: $sortMethod
    ) {
      count
      results {
        docID
        score
        assignment {
          id
          title
          rateType
          publishAt
          hideInDescription
          viewsCount
          commentsCount
          status
          replied
          uuid
          type
          place
          companyId
          company {
            id
            logoImageFile {
              id
              blobName
              container
            }
            name
          }
          description
          descriptionIsVisible
          isRandomlyVisible
          isRead
          isFavorite
        }
      }
    }
  }
`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      showFavoritesOnly: // value for 'showFavoritesOnly'
 *      sortMethod: // value for 'sortMethod'
 *   },
 * });
 */
export function useSearchQuery(
  baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables> &
    ({ variables: SearchQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchQuery, SearchQueryVariables>(
    SearchDocument,
    options
  );
}
export function useSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(
    SearchDocument,
    options
  );
}
export function useSearchSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SearchQuery,
    SearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SearchQuery, SearchQueryVariables>(
    SearchDocument,
    options
  );
}
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchSuspenseQueryHookResult = ReturnType<
  typeof useSearchSuspenseQuery
>;
export type SearchQueryResult = Apollo.QueryResult<
  SearchQuery,
  SearchQueryVariables
>;
