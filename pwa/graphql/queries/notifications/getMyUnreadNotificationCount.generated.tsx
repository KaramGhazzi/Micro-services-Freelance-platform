import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyUnreadNotificationCountQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type MyUnreadNotificationCountQuery = {
  __typename?: 'Query';
  myUnreadNotificationCount: number;
};

export const MyUnreadNotificationCountDocument = gql`
  query myUnreadNotificationCount {
    myUnreadNotificationCount
  }
`;

/**
 * __useMyUnreadNotificationCountQuery__
 *
 * To run a query within a React component, call `useMyUnreadNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUnreadNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUnreadNotificationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUnreadNotificationCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyUnreadNotificationCountQuery,
    MyUnreadNotificationCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyUnreadNotificationCountQuery,
    MyUnreadNotificationCountQueryVariables
  >(MyUnreadNotificationCountDocument, options);
}
export function useMyUnreadNotificationCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyUnreadNotificationCountQuery,
    MyUnreadNotificationCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyUnreadNotificationCountQuery,
    MyUnreadNotificationCountQueryVariables
  >(MyUnreadNotificationCountDocument, options);
}
export function useMyUnreadNotificationCountSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    MyUnreadNotificationCountQuery,
    MyUnreadNotificationCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MyUnreadNotificationCountQuery,
    MyUnreadNotificationCountQueryVariables
  >(MyUnreadNotificationCountDocument, options);
}
export type MyUnreadNotificationCountQueryHookResult = ReturnType<
  typeof useMyUnreadNotificationCountQuery
>;
export type MyUnreadNotificationCountLazyQueryHookResult = ReturnType<
  typeof useMyUnreadNotificationCountLazyQuery
>;
export type MyUnreadNotificationCountSuspenseQueryHookResult = ReturnType<
  typeof useMyUnreadNotificationCountSuspenseQuery
>;
export type MyUnreadNotificationCountQueryResult = Apollo.QueryResult<
  MyUnreadNotificationCountQuery,
  MyUnreadNotificationCountQueryVariables
>;
