import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerificationGetCompanyQueryVariables = Types.Exact<{
  countryCode: Types.VerificationCountryCodes;
  identificationNumber: Types.Scalars['String']['input'];
}>;

export type VerificationGetCompanyQuery = {
  __typename?: 'Query';
  verificationGetCompany?: {
    __typename?: 'VerificationCompanyResponse';
    city?: string | null;
    houseNumber?: string | null;
    identificationNumber: string;
    name: string;
    postalCode?: string | null;
    street?: string | null;
    fullAddress?: string | null;
  } | null;
};

export const VerificationGetCompanyDocument = gql`
  query VerificationGetCompany(
    $countryCode: VerificationCountryCodes!
    $identificationNumber: String!
  ) {
    verificationGetCompany(
      countryCode: $countryCode
      identificationNumber: $identificationNumber
    ) {
      city
      houseNumber
      identificationNumber
      name
      postalCode
      street
      fullAddress
    }
  }
`;

/**
 * __useVerificationGetCompanyQuery__
 *
 * To run a query within a React component, call `useVerificationGetCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerificationGetCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerificationGetCompanyQuery({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *      identificationNumber: // value for 'identificationNumber'
 *   },
 * });
 */
export function useVerificationGetCompanyQuery(
  baseOptions: Apollo.QueryHookOptions<
    VerificationGetCompanyQuery,
    VerificationGetCompanyQueryVariables
  > &
    (
      | { variables: VerificationGetCompanyQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    VerificationGetCompanyQuery,
    VerificationGetCompanyQueryVariables
  >(VerificationGetCompanyDocument, options);
}
export function useVerificationGetCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VerificationGetCompanyQuery,
    VerificationGetCompanyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    VerificationGetCompanyQuery,
    VerificationGetCompanyQueryVariables
  >(VerificationGetCompanyDocument, options);
}
export function useVerificationGetCompanySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    VerificationGetCompanyQuery,
    VerificationGetCompanyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    VerificationGetCompanyQuery,
    VerificationGetCompanyQueryVariables
  >(VerificationGetCompanyDocument, options);
}
export type VerificationGetCompanyQueryHookResult = ReturnType<
  typeof useVerificationGetCompanyQuery
>;
export type VerificationGetCompanyLazyQueryHookResult = ReturnType<
  typeof useVerificationGetCompanyLazyQuery
>;
export type VerificationGetCompanySuspenseQueryHookResult = ReturnType<
  typeof useVerificationGetCompanySuspenseQuery
>;
export type VerificationGetCompanyQueryResult = Apollo.QueryResult<
  VerificationGetCompanyQuery,
  VerificationGetCompanyQueryVariables
>;
