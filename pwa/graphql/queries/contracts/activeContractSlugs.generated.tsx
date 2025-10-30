import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActiveContractSlugsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ActiveContractSlugsQuery = {
  __typename?: 'Query';
  activeContractSlugs: Array<string>;
};

export const ActiveContractSlugsDocument = gql`
  query activeContractSlugs {
    activeContractSlugs
  }
`;

/**
 * __useActiveContractSlugsQuery__
 *
 * To run a query within a React component, call `useActiveContractSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveContractSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveContractSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveContractSlugsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ActiveContractSlugsQuery,
    ActiveContractSlugsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ActiveContractSlugsQuery,
    ActiveContractSlugsQueryVariables
  >(ActiveContractSlugsDocument, options);
}
export function useActiveContractSlugsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ActiveContractSlugsQuery,
    ActiveContractSlugsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ActiveContractSlugsQuery,
    ActiveContractSlugsQueryVariables
  >(ActiveContractSlugsDocument, options);
}
export function useActiveContractSlugsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ActiveContractSlugsQuery,
    ActiveContractSlugsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ActiveContractSlugsQuery,
    ActiveContractSlugsQueryVariables
  >(ActiveContractSlugsDocument, options);
}
export type ActiveContractSlugsQueryHookResult = ReturnType<
  typeof useActiveContractSlugsQuery
>;
export type ActiveContractSlugsLazyQueryHookResult = ReturnType<
  typeof useActiveContractSlugsLazyQuery
>;
export type ActiveContractSlugsSuspenseQueryHookResult = ReturnType<
  typeof useActiveContractSlugsSuspenseQuery
>;
export type ActiveContractSlugsQueryResult = Apollo.QueryResult<
  ActiveContractSlugsQuery,
  ActiveContractSlugsQueryVariables
>;
