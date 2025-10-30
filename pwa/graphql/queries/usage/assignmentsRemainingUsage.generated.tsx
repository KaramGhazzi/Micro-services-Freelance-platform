import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AssignmentsRemainingUsageQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type AssignmentsRemainingUsageQuery = {
  __typename?: 'Query';
  assignmentsRemainingUsage: Array<{
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

export const AssignmentsRemainingUsageDocument = gql`
  query AssignmentsRemainingUsage {
    assignmentsRemainingUsage {
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
 * __useAssignmentsRemainingUsageQuery__
 *
 * To run a query within a React component, call `useAssignmentsRemainingUsageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentsRemainingUsageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentsRemainingUsageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssignmentsRemainingUsageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AssignmentsRemainingUsageQuery,
    AssignmentsRemainingUsageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AssignmentsRemainingUsageQuery,
    AssignmentsRemainingUsageQueryVariables
  >(AssignmentsRemainingUsageDocument, options);
}
export function useAssignmentsRemainingUsageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AssignmentsRemainingUsageQuery,
    AssignmentsRemainingUsageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AssignmentsRemainingUsageQuery,
    AssignmentsRemainingUsageQueryVariables
  >(AssignmentsRemainingUsageDocument, options);
}
export function useAssignmentsRemainingUsageSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    AssignmentsRemainingUsageQuery,
    AssignmentsRemainingUsageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AssignmentsRemainingUsageQuery,
    AssignmentsRemainingUsageQueryVariables
  >(AssignmentsRemainingUsageDocument, options);
}
export type AssignmentsRemainingUsageQueryHookResult = ReturnType<
  typeof useAssignmentsRemainingUsageQuery
>;
export type AssignmentsRemainingUsageLazyQueryHookResult = ReturnType<
  typeof useAssignmentsRemainingUsageLazyQuery
>;
export type AssignmentsRemainingUsageSuspenseQueryHookResult = ReturnType<
  typeof useAssignmentsRemainingUsageSuspenseQuery
>;
export type AssignmentsRemainingUsageQueryResult = Apollo.QueryResult<
  AssignmentsRemainingUsageQuery,
  AssignmentsRemainingUsageQueryVariables
>;
