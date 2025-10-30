import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerificationSearchCompaniesQueryVariables = Types.Exact<{
  countryCode: Types.VerificationCountryCodes;
  query: Types.Scalars['String']['input'];
  pageSize?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;

export type VerificationSearchCompaniesQuery = {
  __typename?: 'Query';
  verificationSearchCompanies: Array<{
    __typename?: 'VerificationCompanySearch';
    address?: string | null;
    city?: string | null;
    identificationNumber: string;
    name: string;
  }>;
};

export const VerificationSearchCompaniesDocument = gql`
  query VerificationSearchCompanies(
    $countryCode: VerificationCountryCodes!
    $query: String!
    $pageSize: Float
  ) {
    verificationSearchCompanies(
      countryCode: $countryCode
      query: $query
      pageSize: $pageSize
    ) {
      address
      city
      identificationNumber
      name
    }
  }
`;

/**
 * __useVerificationSearchCompaniesQuery__
 *
 * To run a query within a React component, call `useVerificationSearchCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerificationSearchCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerificationSearchCompaniesQuery({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *      query: // value for 'query'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useVerificationSearchCompaniesQuery(
  baseOptions: Apollo.QueryHookOptions<
    VerificationSearchCompaniesQuery,
    VerificationSearchCompaniesQueryVariables
  > &
    (
      | { variables: VerificationSearchCompaniesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    VerificationSearchCompaniesQuery,
    VerificationSearchCompaniesQueryVariables
  >(VerificationSearchCompaniesDocument, options);
}
export function useVerificationSearchCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VerificationSearchCompaniesQuery,
    VerificationSearchCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    VerificationSearchCompaniesQuery,
    VerificationSearchCompaniesQueryVariables
  >(VerificationSearchCompaniesDocument, options);
}
export function useVerificationSearchCompaniesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    VerificationSearchCompaniesQuery,
    VerificationSearchCompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    VerificationSearchCompaniesQuery,
    VerificationSearchCompaniesQueryVariables
  >(VerificationSearchCompaniesDocument, options);
}
export type VerificationSearchCompaniesQueryHookResult = ReturnType<
  typeof useVerificationSearchCompaniesQuery
>;
export type VerificationSearchCompaniesLazyQueryHookResult = ReturnType<
  typeof useVerificationSearchCompaniesLazyQuery
>;
export type VerificationSearchCompaniesSuspenseQueryHookResult = ReturnType<
  typeof useVerificationSearchCompaniesSuspenseQuery
>;
export type VerificationSearchCompaniesQueryResult = Apollo.QueryResult<
  VerificationSearchCompaniesQuery,
  VerificationSearchCompaniesQueryVariables
>;
