import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HasCompanyProfileQueryVariables = Types.Exact<{
  companyId: Types.Scalars['Int']['input'];
}>;

export type HasCompanyProfileQuery = {
  __typename?: 'Query';
  hasCompanyProfile: boolean;
};

export const HasCompanyProfileDocument = gql`
  query HasCompanyProfile($companyId: Int!) {
    hasCompanyProfile(companyId: $companyId)
  }
`;

/**
 * __useHasCompanyProfileQuery__
 *
 * To run a query within a React component, call `useHasCompanyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasCompanyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasCompanyProfileQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useHasCompanyProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    HasCompanyProfileQuery,
    HasCompanyProfileQueryVariables
  > &
    (
      | { variables: HasCompanyProfileQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    HasCompanyProfileQuery,
    HasCompanyProfileQueryVariables
  >(HasCompanyProfileDocument, options);
}
export function useHasCompanyProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HasCompanyProfileQuery,
    HasCompanyProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    HasCompanyProfileQuery,
    HasCompanyProfileQueryVariables
  >(HasCompanyProfileDocument, options);
}
export function useHasCompanyProfileSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    HasCompanyProfileQuery,
    HasCompanyProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    HasCompanyProfileQuery,
    HasCompanyProfileQueryVariables
  >(HasCompanyProfileDocument, options);
}
export type HasCompanyProfileQueryHookResult = ReturnType<
  typeof useHasCompanyProfileQuery
>;
export type HasCompanyProfileLazyQueryHookResult = ReturnType<
  typeof useHasCompanyProfileLazyQuery
>;
export type HasCompanyProfileSuspenseQueryHookResult = ReturnType<
  typeof useHasCompanyProfileSuspenseQuery
>;
export type HasCompanyProfileQueryResult = Apollo.QueryResult<
  HasCompanyProfileQuery,
  HasCompanyProfileQueryVariables
>;
