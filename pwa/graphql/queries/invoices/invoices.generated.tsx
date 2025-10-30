import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvoicesQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type InvoicesQuery = {
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

export const InvoicesDocument = gql`
  query Invoices($skip: Int, $take: Int) {
    invoices(take: $take, skip: $skip) {
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
 * __useInvoicesQuery__
 *
 * To run a query within a React component, call `useInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useInvoicesQuery(
  baseOptions?: Apollo.QueryHookOptions<InvoicesQuery, InvoicesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InvoicesQuery, InvoicesQueryVariables>(
    InvoicesDocument,
    options
  );
}
export function useInvoicesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    InvoicesQuery,
    InvoicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InvoicesQuery, InvoicesQueryVariables>(
    InvoicesDocument,
    options
  );
}
export function useInvoicesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    InvoicesQuery,
    InvoicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<InvoicesQuery, InvoicesQueryVariables>(
    InvoicesDocument,
    options
  );
}
export type InvoicesQueryHookResult = ReturnType<typeof useInvoicesQuery>;
export type InvoicesLazyQueryHookResult = ReturnType<
  typeof useInvoicesLazyQuery
>;
export type InvoicesSuspenseQueryHookResult = ReturnType<
  typeof useInvoicesSuspenseQuery
>;
export type InvoicesQueryResult = Apollo.QueryResult<
  InvoicesQuery,
  InvoicesQueryVariables
>;
