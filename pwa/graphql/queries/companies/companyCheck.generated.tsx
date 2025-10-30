import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompanyCheckQueryVariables = Types.Exact<{
  cocNumber: Types.Scalars['String']['input'];
  cocCountry: Types.Scalars['String']['input'];
}>;

export type CompanyCheckQuery = {
  __typename?: 'Query';
  companyCheck?: {
    __typename?: 'Company';
    id: string;
    hasActiveUsers?: boolean | null;
    cocNumber?: string | null;
    name?: string | null;
    address?: {
      __typename?: 'Address';
      addressLine1: string;
      city: string;
    } | null;
  } | null;
};

export const CompanyCheckDocument = gql`
  query companyCheck($cocNumber: String!, $cocCountry: String!) {
    companyCheck(cocNumber: $cocNumber, cocCountry: $cocCountry) {
      id
      hasActiveUsers
      cocNumber
      name
      address {
        addressLine1
        city
      }
    }
  }
`;

/**
 * __useCompanyCheckQuery__
 *
 * To run a query within a React component, call `useCompanyCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyCheckQuery({
 *   variables: {
 *      cocNumber: // value for 'cocNumber'
 *      cocCountry: // value for 'cocCountry'
 *   },
 * });
 */
export function useCompanyCheckQuery(
  baseOptions: Apollo.QueryHookOptions<
    CompanyCheckQuery,
    CompanyCheckQueryVariables
  > &
    (
      | { variables: CompanyCheckQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompanyCheckQuery, CompanyCheckQueryVariables>(
    CompanyCheckDocument,
    options
  );
}
export function useCompanyCheckLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CompanyCheckQuery,
    CompanyCheckQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompanyCheckQuery, CompanyCheckQueryVariables>(
    CompanyCheckDocument,
    options
  );
}
export function useCompanyCheckSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CompanyCheckQuery,
    CompanyCheckQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CompanyCheckQuery, CompanyCheckQueryVariables>(
    CompanyCheckDocument,
    options
  );
}
export type CompanyCheckQueryHookResult = ReturnType<
  typeof useCompanyCheckQuery
>;
export type CompanyCheckLazyQueryHookResult = ReturnType<
  typeof useCompanyCheckLazyQuery
>;
export type CompanyCheckSuspenseQueryHookResult = ReturnType<
  typeof useCompanyCheckSuspenseQuery
>;
export type CompanyCheckQueryResult = Apollo.QueryResult<
  CompanyCheckQuery,
  CompanyCheckQueryVariables
>;
