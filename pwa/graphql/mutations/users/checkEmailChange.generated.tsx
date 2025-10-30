import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckEmailChangeQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;

export type CheckEmailChangeQuery = {
  __typename?: 'Query';
  checkEmailChange: {
    __typename?: 'RequestEmailChangeOutput';
    success: boolean;
  };
};

export const CheckEmailChangeDocument = gql`
  query checkEmailChange($token: String!) {
    checkEmailChange(token: $token) {
      success
    }
  }
`;

/**
 * __useCheckEmailChangeQuery__
 *
 * To run a query within a React component, call `useCheckEmailChangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckEmailChangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckEmailChangeQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCheckEmailChangeQuery(
  baseOptions: Apollo.QueryHookOptions<
    CheckEmailChangeQuery,
    CheckEmailChangeQueryVariables
  > &
    (
      | { variables: CheckEmailChangeQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckEmailChangeQuery, CheckEmailChangeQueryVariables>(
    CheckEmailChangeDocument,
    options
  );
}
export function useCheckEmailChangeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckEmailChangeQuery,
    CheckEmailChangeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CheckEmailChangeQuery,
    CheckEmailChangeQueryVariables
  >(CheckEmailChangeDocument, options);
}
export function useCheckEmailChangeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CheckEmailChangeQuery,
    CheckEmailChangeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CheckEmailChangeQuery,
    CheckEmailChangeQueryVariables
  >(CheckEmailChangeDocument, options);
}
export type CheckEmailChangeQueryHookResult = ReturnType<
  typeof useCheckEmailChangeQuery
>;
export type CheckEmailChangeLazyQueryHookResult = ReturnType<
  typeof useCheckEmailChangeLazyQuery
>;
export type CheckEmailChangeSuspenseQueryHookResult = ReturnType<
  typeof useCheckEmailChangeSuspenseQuery
>;
export type CheckEmailChangeQueryResult = Apollo.QueryResult<
  CheckEmailChangeQuery,
  CheckEmailChangeQueryVariables
>;
