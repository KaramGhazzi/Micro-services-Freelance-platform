import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckInviteQueryVariables = Types.Exact<{
  inviteToken: Types.Scalars['String']['input'];
}>;

export type CheckInviteQuery = {
  __typename?: 'Query';
  checkInvite: {
    __typename?: 'CheckTokenOutput';
    confirmed?: boolean | null;
    success: string;
  };
};

export const CheckInviteDocument = gql`
  query CheckInvite($inviteToken: String!) {
    checkInvite(inviteToken: $inviteToken) {
      confirmed
      success
    }
  }
`;

/**
 * __useCheckInviteQuery__
 *
 * To run a query within a React component, call `useCheckInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckInviteQuery({
 *   variables: {
 *      inviteToken: // value for 'inviteToken'
 *   },
 * });
 */
export function useCheckInviteQuery(
  baseOptions: Apollo.QueryHookOptions<
    CheckInviteQuery,
    CheckInviteQueryVariables
  > &
    (
      | { variables: CheckInviteQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckInviteQuery, CheckInviteQueryVariables>(
    CheckInviteDocument,
    options
  );
}
export function useCheckInviteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckInviteQuery,
    CheckInviteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckInviteQuery, CheckInviteQueryVariables>(
    CheckInviteDocument,
    options
  );
}
export function useCheckInviteSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CheckInviteQuery,
    CheckInviteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CheckInviteQuery, CheckInviteQueryVariables>(
    CheckInviteDocument,
    options
  );
}
export type CheckInviteQueryHookResult = ReturnType<typeof useCheckInviteQuery>;
export type CheckInviteLazyQueryHookResult = ReturnType<
  typeof useCheckInviteLazyQuery
>;
export type CheckInviteSuspenseQueryHookResult = ReturnType<
  typeof useCheckInviteSuspenseQuery
>;
export type CheckInviteQueryResult = Apollo.QueryResult<
  CheckInviteQuery,
  CheckInviteQueryVariables
>;
