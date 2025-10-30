import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemainingUsageByCreditTypeQueryVariables = Types.Exact<{
  usageType: Types.Scalars['String']['input'];
}>;

export type RemainingUsageByCreditTypeQuery = {
  __typename?: 'Query';
  remainingUsageByCreditType: {
    __typename?: 'Credit';
    amount: number;
    refreshDate?: any | null;
    usageType: string;
  };
};

export const RemainingUsageByCreditTypeDocument = gql`
  query remainingUsageByCreditType($usageType: String!) {
    remainingUsageByCreditType(usageType: $usageType) {
      amount
      refreshDate
      usageType
    }
  }
`;

/**
 * __useRemainingUsageByCreditTypeQuery__
 *
 * To run a query within a React component, call `useRemainingUsageByCreditTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRemainingUsageByCreditTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRemainingUsageByCreditTypeQuery({
 *   variables: {
 *      usageType: // value for 'usageType'
 *   },
 * });
 */
export function useRemainingUsageByCreditTypeQuery(
  baseOptions: Apollo.QueryHookOptions<
    RemainingUsageByCreditTypeQuery,
    RemainingUsageByCreditTypeQueryVariables
  > &
    (
      | { variables: RemainingUsageByCreditTypeQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    RemainingUsageByCreditTypeQuery,
    RemainingUsageByCreditTypeQueryVariables
  >(RemainingUsageByCreditTypeDocument, options);
}
export function useRemainingUsageByCreditTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RemainingUsageByCreditTypeQuery,
    RemainingUsageByCreditTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    RemainingUsageByCreditTypeQuery,
    RemainingUsageByCreditTypeQueryVariables
  >(RemainingUsageByCreditTypeDocument, options);
}
export function useRemainingUsageByCreditTypeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    RemainingUsageByCreditTypeQuery,
    RemainingUsageByCreditTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RemainingUsageByCreditTypeQuery,
    RemainingUsageByCreditTypeQueryVariables
  >(RemainingUsageByCreditTypeDocument, options);
}
export type RemainingUsageByCreditTypeQueryHookResult = ReturnType<
  typeof useRemainingUsageByCreditTypeQuery
>;
export type RemainingUsageByCreditTypeLazyQueryHookResult = ReturnType<
  typeof useRemainingUsageByCreditTypeLazyQuery
>;
export type RemainingUsageByCreditTypeSuspenseQueryHookResult = ReturnType<
  typeof useRemainingUsageByCreditTypeSuspenseQuery
>;
export type RemainingUsageByCreditTypeQueryResult = Apollo.QueryResult<
  RemainingUsageByCreditTypeQuery,
  RemainingUsageByCreditTypeQueryVariables
>;
