import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CanReviewQueryVariables = Types.Exact<{
  companyId: Types.Scalars['Int']['input'];
  assignmentId: Types.Scalars['Int']['input'];
  assignmentOwnerId: Types.Scalars['Int']['input'];
}>;

export type CanReviewQuery = { __typename?: 'Query'; canReview: boolean };

export const CanReviewDocument = gql`
  query canReview(
    $companyId: Int!
    $assignmentId: Int!
    $assignmentOwnerId: Int!
  ) {
    canReview(
      companyId: $companyId
      assignmentId: $assignmentId
      assignmentOwnerId: $assignmentOwnerId
    )
  }
`;

/**
 * __useCanReviewQuery__
 *
 * To run a query within a React component, call `useCanReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanReviewQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      assignmentId: // value for 'assignmentId'
 *      assignmentOwnerId: // value for 'assignmentOwnerId'
 *   },
 * });
 */
export function useCanReviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    CanReviewQuery,
    CanReviewQueryVariables
  > &
    ({ variables: CanReviewQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CanReviewQuery, CanReviewQueryVariables>(
    CanReviewDocument,
    options
  );
}
export function useCanReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CanReviewQuery,
    CanReviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CanReviewQuery, CanReviewQueryVariables>(
    CanReviewDocument,
    options
  );
}
export function useCanReviewSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CanReviewQuery,
    CanReviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CanReviewQuery, CanReviewQueryVariables>(
    CanReviewDocument,
    options
  );
}
export type CanReviewQueryHookResult = ReturnType<typeof useCanReviewQuery>;
export type CanReviewLazyQueryHookResult = ReturnType<
  typeof useCanReviewLazyQuery
>;
export type CanReviewSuspenseQueryHookResult = ReturnType<
  typeof useCanReviewSuspenseQuery
>;
export type CanReviewQueryResult = Apollo.QueryResult<
  CanReviewQuery,
  CanReviewQueryVariables
>;
