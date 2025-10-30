import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckoutQueryVariables = Types.Exact<{
  where: Types.CheckoutWhereInput;
}>;

export type CheckoutQuery = {
  __typename?: 'Query';
  checkout: {
    __typename?: 'Checkout';
    planId: number;
    companyId: number;
    session: {
      __typename?: 'StripeSession';
      amount_total?: number | null;
      invoice?: string | null;
      amount_subtotal?: number | null;
      total_details?: {
        __typename?: 'TotalDetails';
        amount_tax?: number | null;
      } | null;
    };
    plan: {
      __typename?: 'Plan';
      slug?: string | null;
      usageAmount?: number | null;
      contracts?: Array<{ __typename?: 'Contract'; id: string }> | null;
      product: {
        __typename?: 'Product';
        modeType?: Types.ModeType | null;
        externalProviderId?: string | null;
        name: string;
      };
    };
  };
};

export const CheckoutDocument = gql`
  query Checkout($where: CheckoutWhereInput!) {
    checkout(where: $where) {
      session {
        amount_total
        invoice
        amount_subtotal
        total_details {
          amount_tax
        }
      }
      planId
      companyId
      plan {
        contracts {
          id
        }
        slug
        usageAmount
        product {
          modeType
          externalProviderId
          name
        }
      }
    }
  }
`;

/**
 * __useCheckoutQuery__
 *
 * To run a query within a React component, call `useCheckoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCheckoutQuery(
  baseOptions: Apollo.QueryHookOptions<CheckoutQuery, CheckoutQueryVariables> &
    ({ variables: CheckoutQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckoutQuery, CheckoutQueryVariables>(
    CheckoutDocument,
    options
  );
}
export function useCheckoutLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckoutQuery,
    CheckoutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckoutQuery, CheckoutQueryVariables>(
    CheckoutDocument,
    options
  );
}
export function useCheckoutSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CheckoutQuery,
    CheckoutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CheckoutQuery, CheckoutQueryVariables>(
    CheckoutDocument,
    options
  );
}
export type CheckoutQueryHookResult = ReturnType<typeof useCheckoutQuery>;
export type CheckoutLazyQueryHookResult = ReturnType<
  typeof useCheckoutLazyQuery
>;
export type CheckoutSuspenseQueryHookResult = ReturnType<
  typeof useCheckoutSuspenseQuery
>;
export type CheckoutQueryResult = Apollo.QueryResult<
  CheckoutQuery,
  CheckoutQueryVariables
>;
