import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvoicesAdminQueryVariables = Types.Exact<{
  companyId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type InvoicesAdminQuery = {
  __typename?: 'Query';
  invoices: Array<{
    __typename?: 'Invoice';
    id?: string | null;
    name?: string | null;
    status?: string | null;
    date?: any | null;
    priceExVat?: number | null;
    priceInclVat?: number | null;
    downloadLink?: string | null;
    subscription?: string | null;
  }>;
};

export const InvoicesAdminDocument = gql`
  query InvoicesAdmin($companyId: Int, $skip: Int, $take: Int) {
    invoices: invoicesAdmin(companyId: $companyId, take: $take, skip: $skip) {
      id
      name
      status
      date
      priceExVat
      priceInclVat
      downloadLink
      subscription
    }
  }
`;

/**
 * __useInvoicesAdminQuery__
 *
 * To run a query within a React component, call `useInvoicesAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesAdminQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useInvoicesAdminQuery(
  baseOptions?: Apollo.QueryHookOptions<
    InvoicesAdminQuery,
    InvoicesAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvoicesAdminQuery, InvoicesAdminQueryVariables>(
    InvoicesAdminDocument,
    options
  );
}
export function useInvoicesAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    InvoicesAdminQuery,
    InvoicesAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvoicesAdminQuery, InvoicesAdminQueryVariables>(
    InvoicesAdminDocument,
    options
  );
}
export function useInvoicesAdminSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    InvoicesAdminQuery,
    InvoicesAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    InvoicesAdminQuery,
    InvoicesAdminQueryVariables
  >(InvoicesAdminDocument, options);
}
export type InvoicesAdminQueryHookResult = ReturnType<
  typeof useInvoicesAdminQuery
>;
export type InvoicesAdminLazyQueryHookResult = ReturnType<
  typeof useInvoicesAdminLazyQuery
>;
export type InvoicesAdminSuspenseQueryHookResult = ReturnType<
  typeof useInvoicesAdminSuspenseQuery
>;
export type InvoicesAdminQueryResult = Apollo.QueryResult<
  InvoicesAdminQuery,
  InvoicesAdminQueryVariables
>;
