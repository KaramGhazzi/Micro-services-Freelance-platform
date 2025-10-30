import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyNotificationsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.NotificationWhereInput>;
  orderBy?: Types.InputMaybe<
    | Array<Types.NotificationOrderByWithRelationInput>
    | Types.NotificationOrderByWithRelationInput
  >;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type GetMyNotificationsQuery = {
  __typename?: 'Query';
  count: number;
  myNotifications: Array<{
    __typename?: 'Notification';
    id: string;
    type: Types.NotificationType;
    readAt?: any | null;
    createdAt: any;
    data?: string | null;
  }>;
};

export const GetMyNotificationsDocument = gql`
  query getMyNotifications(
    $where: NotificationWhereInput
    $orderBy: [NotificationOrderByWithRelationInput!]
    $skip: Int
    $take: Int
  ) {
    count: myNotificationCount(where: $where)
    myNotifications: myNotifications(
      where: $where
      orderBy: $orderBy
      skip: $skip
      take: $take
    ) {
      id
      type
      readAt
      createdAt
      data
    }
  }
`;

/**
 * __useGetMyNotificationsQuery__
 *
 * To run a query within a React component, call `useGetMyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyNotificationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetMyNotificationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyNotificationsQuery,
    GetMyNotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMyNotificationsQuery,
    GetMyNotificationsQueryVariables
  >(GetMyNotificationsDocument, options);
}
export function useGetMyNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyNotificationsQuery,
    GetMyNotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyNotificationsQuery,
    GetMyNotificationsQueryVariables
  >(GetMyNotificationsDocument, options);
}
export function useGetMyNotificationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyNotificationsQuery,
    GetMyNotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyNotificationsQuery,
    GetMyNotificationsQueryVariables
  >(GetMyNotificationsDocument, options);
}
export type GetMyNotificationsQueryHookResult = ReturnType<
  typeof useGetMyNotificationsQuery
>;
export type GetMyNotificationsLazyQueryHookResult = ReturnType<
  typeof useGetMyNotificationsLazyQuery
>;
export type GetMyNotificationsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyNotificationsSuspenseQuery
>;
export type GetMyNotificationsQueryResult = Apollo.QueryResult<
  GetMyNotificationsQuery,
  GetMyNotificationsQueryVariables
>;
