import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TopBoxCompaniesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type TopBoxCompaniesQuery = {
  __typename?: 'Query';
  topBoxCompanies: Array<{ __typename?: 'Contract'; companyId: number }>;
};

export const TopBoxCompaniesDocument = gql`
  query TopBoxCompanies {
    topBoxCompanies {
      companyId
    }
  }
`;

/**
 * __useTopBoxCompaniesQuery__
 *
 * To run a query within a React component, call `useTopBoxCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopBoxCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopBoxCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopBoxCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TopBoxCompaniesQuery,
    TopBoxCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TopBoxCompaniesQuery, TopBoxCompaniesQueryVariables>(
    TopBoxCompaniesDocument,
    options
  );
}
export function useTopBoxCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TopBoxCompaniesQuery,
    TopBoxCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TopBoxCompaniesQuery,
    TopBoxCompaniesQueryVariables
  >(TopBoxCompaniesDocument, options);
}
export function useTopBoxCompaniesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    TopBoxCompaniesQuery,
    TopBoxCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    TopBoxCompaniesQuery,
    TopBoxCompaniesQueryVariables
  >(TopBoxCompaniesDocument, options);
}
export type TopBoxCompaniesQueryHookResult = ReturnType<
  typeof useTopBoxCompaniesQuery
>;
export type TopBoxCompaniesLazyQueryHookResult = ReturnType<
  typeof useTopBoxCompaniesLazyQuery
>;
export type TopBoxCompaniesSuspenseQueryHookResult = ReturnType<
  typeof useTopBoxCompaniesSuspenseQuery
>;
export type TopBoxCompaniesQueryResult = Apollo.QueryResult<
  TopBoxCompaniesQuery,
  TopBoxCompaniesQueryVariables
>;
