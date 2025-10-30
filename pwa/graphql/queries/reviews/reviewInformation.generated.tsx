import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReviewInformationQueryVariables = Types.Exact<{
  companyId: Types.Scalars['Float']['input'];
}>;

export type ReviewInformationQuery = {
  __typename?: 'Query';
  reviewInformation: {
    __typename?: 'ReviewInformation';
    tip: number;
    top: number;
  };
};

export const ReviewInformationDocument = gql`
  query reviewInformation($companyId: Float!) {
    reviewInformation(companyId: $companyId) {
      tip
      top
    }
  }
`;

/**
 * __useReviewInformationQuery__
 *
 * To run a query within a React component, call `useReviewInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewInformationQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useReviewInformationQuery(
  baseOptions: Apollo.QueryHookOptions<
    ReviewInformationQuery,
    ReviewInformationQueryVariables
  > &
    (
      | { variables: ReviewInformationQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ReviewInformationQuery,
    ReviewInformationQueryVariables
  >(ReviewInformationDocument, options);
}
export function useReviewInformationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ReviewInformationQuery,
    ReviewInformationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ReviewInformationQuery,
    ReviewInformationQueryVariables
  >(ReviewInformationDocument, options);
}
export function useReviewInformationSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ReviewInformationQuery,
    ReviewInformationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ReviewInformationQuery,
    ReviewInformationQueryVariables
  >(ReviewInformationDocument, options);
}
export type ReviewInformationQueryHookResult = ReturnType<
  typeof useReviewInformationQuery
>;
export type ReviewInformationLazyQueryHookResult = ReturnType<
  typeof useReviewInformationLazyQuery
>;
export type ReviewInformationSuspenseQueryHookResult = ReturnType<
  typeof useReviewInformationSuspenseQuery
>;
export type ReviewInformationQueryResult = Apollo.QueryResult<
  ReviewInformationQuery,
  ReviewInformationQueryVariables
>;
