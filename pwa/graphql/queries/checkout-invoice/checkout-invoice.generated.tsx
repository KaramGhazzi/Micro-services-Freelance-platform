import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckoutInvoiceQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;

export type CheckoutInvoiceQuery = {
  __typename?: 'Query';
  checkoutInvoice: {
    __typename?: 'CheckoutInvoiceDetails';
    invoiceId: string;
    value: number;
    tax: number;
    currency: string;
    itemName: string;
    quantity: number;
    itemId: string;
    productId: string;
  };
};

export const CheckoutInvoiceDocument = gql`
  query CheckoutInvoice($token: String!) {
    checkoutInvoice(token: $token) {
      invoiceId
      value
      tax
      currency
      itemName
      quantity
      itemId
      productId
    }
  }
`;

/**
 * __useCheckoutInvoiceQuery__
 *
 * To run a query within a React component, call `useCheckoutInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutInvoiceQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCheckoutInvoiceQuery(
  baseOptions: Apollo.QueryHookOptions<
    CheckoutInvoiceQuery,
    CheckoutInvoiceQueryVariables
  > &
    (
      | { variables: CheckoutInvoiceQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckoutInvoiceQuery, CheckoutInvoiceQueryVariables>(
    CheckoutInvoiceDocument,
    options
  );
}
export function useCheckoutInvoiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckoutInvoiceQuery,
    CheckoutInvoiceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CheckoutInvoiceQuery,
    CheckoutInvoiceQueryVariables
  >(CheckoutInvoiceDocument, options);
}
export function useCheckoutInvoiceSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CheckoutInvoiceQuery,
    CheckoutInvoiceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CheckoutInvoiceQuery,
    CheckoutInvoiceQueryVariables
  >(CheckoutInvoiceDocument, options);
}
export type CheckoutInvoiceQueryHookResult = ReturnType<
  typeof useCheckoutInvoiceQuery
>;
export type CheckoutInvoiceLazyQueryHookResult = ReturnType<
  typeof useCheckoutInvoiceLazyQuery
>;
export type CheckoutInvoiceSuspenseQueryHookResult = ReturnType<
  typeof useCheckoutInvoiceSuspenseQuery
>;
export type CheckoutInvoiceQueryResult = Apollo.QueryResult<
  CheckoutInvoiceQuery,
  CheckoutInvoiceQueryVariables
>;
