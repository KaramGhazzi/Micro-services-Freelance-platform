import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemainingUsagePerContractQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type RemainingUsagePerContractQuery = {
  __typename?: 'Query';
  remainingUsage: Array<{
    __typename?: 'Credit';
    usageType: string;
    amount: number;
    refreshDate?: any | null;
    contractAmount: number;
    productSlug?: string | null;
    contractStartDate?: any | null;
    contractEndDate?: any | null;
  }>;
};

export const RemainingUsagePerContractDocument = gql`
  query RemainingUsagePerContract {
    remainingUsage {
      usageType
      amount
      refreshDate
      contractAmount
      productSlug
      contractStartDate
      contractEndDate
    }
  }
`;

/**
 * __useRemainingUsagePerContractQuery__
 *
 * To run a query within a React component, call `useRemainingUsagePerContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useRemainingUsagePerContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRemainingUsagePerContractQuery({
 *   variables: {
 *   },
 * });
 */
export function useRemainingUsagePerContractQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RemainingUsagePerContractQuery,
    RemainingUsagePerContractQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    RemainingUsagePerContractQuery,
    RemainingUsagePerContractQueryVariables
  >(RemainingUsagePerContractDocument, options);
}
export function useRemainingUsagePerContractLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RemainingUsagePerContractQuery,
    RemainingUsagePerContractQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    RemainingUsagePerContractQuery,
    RemainingUsagePerContractQueryVariables
  >(RemainingUsagePerContractDocument, options);
}
export function useRemainingUsagePerContractSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    RemainingUsagePerContractQuery,
    RemainingUsagePerContractQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RemainingUsagePerContractQuery,
    RemainingUsagePerContractQueryVariables
  >(RemainingUsagePerContractDocument, options);
}
export type RemainingUsagePerContractQueryHookResult = ReturnType<
  typeof useRemainingUsagePerContractQuery
>;
export type RemainingUsagePerContractLazyQueryHookResult = ReturnType<
  typeof useRemainingUsagePerContractLazyQuery
>;
export type RemainingUsagePerContractSuspenseQueryHookResult = ReturnType<
  typeof useRemainingUsagePerContractSuspenseQuery
>;
export type RemainingUsagePerContractQueryResult = Apollo.QueryResult<
  RemainingUsagePerContractQuery,
  RemainingUsagePerContractQueryVariables
>;
