import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemainingUsageByProductSlugQueryVariables = Types.Exact<{
  productSlug: Types.Scalars['String']['input'];
}>;

export type RemainingUsageByProductSlugQuery = {
  __typename?: 'Query';
  remainingUsageByProductSlug: { __typename?: 'Credit'; amount: number };
};

export const RemainingUsageByProductSlugDocument = gql`
  query remainingUsageByProductSlug($productSlug: String!) {
    remainingUsageByProductSlug(productSlug: $productSlug) {
      amount
    }
  }
`;

/**
 * __useRemainingUsageByProductSlugQuery__
 *
 * To run a query within a React component, call `useRemainingUsageByProductSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useRemainingUsageByProductSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRemainingUsageByProductSlugQuery({
 *   variables: {
 *      productSlug: // value for 'productSlug'
 *   },
 * });
 */
export function useRemainingUsageByProductSlugQuery(
  baseOptions: Apollo.QueryHookOptions<
    RemainingUsageByProductSlugQuery,
    RemainingUsageByProductSlugQueryVariables
  > &
    (
      | { variables: RemainingUsageByProductSlugQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    RemainingUsageByProductSlugQuery,
    RemainingUsageByProductSlugQueryVariables
  >(RemainingUsageByProductSlugDocument, options);
}
export function useRemainingUsageByProductSlugLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RemainingUsageByProductSlugQuery,
    RemainingUsageByProductSlugQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    RemainingUsageByProductSlugQuery,
    RemainingUsageByProductSlugQueryVariables
  >(RemainingUsageByProductSlugDocument, options);
}
export function useRemainingUsageByProductSlugSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    RemainingUsageByProductSlugQuery,
    RemainingUsageByProductSlugQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RemainingUsageByProductSlugQuery,
    RemainingUsageByProductSlugQueryVariables
  >(RemainingUsageByProductSlugDocument, options);
}
export type RemainingUsageByProductSlugQueryHookResult = ReturnType<
  typeof useRemainingUsageByProductSlugQuery
>;
export type RemainingUsageByProductSlugLazyQueryHookResult = ReturnType<
  typeof useRemainingUsageByProductSlugLazyQuery
>;
export type RemainingUsageByProductSlugSuspenseQueryHookResult = ReturnType<
  typeof useRemainingUsageByProductSlugSuspenseQuery
>;
export type RemainingUsageByProductSlugQueryResult = Apollo.QueryResult<
  RemainingUsageByProductSlugQuery,
  RemainingUsageByProductSlugQueryVariables
>;
