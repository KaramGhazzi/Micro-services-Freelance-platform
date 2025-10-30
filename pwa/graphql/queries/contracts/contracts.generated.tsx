import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ContractWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.ContractOrderByWithRelationInput>
    | Types.ContractOrderByWithRelationInput
  >;
}>;

export type ContractsQuery = {
  __typename?: 'Query';
  contracts: Array<{
    __typename?: 'Contract';
    id: string;
    companyId: number;
    externalProviderId?: string | null;
    subscriptionExpireDate?: any | null;
    planId: number;
    renewalInterval?: Types.RenewalInterval | null;
    startDate: any;
    endDate?: any | null;
    usageType: Types.UsageType;
    usageAmount?: number | null;
    usageInterval?: Types.Interval | null;
    usageIntervalCount?: number | null;
    plan: {
      __typename?: 'Plan';
      id: string;
      slug?: string | null;
      product: { __typename?: 'Product'; slug: Types.ProductSlug };
    };
    subscription?: {
      __typename?: 'StripeSubscription';
      id?: string | null;
      object?: string | null;
      billing_cycle_anchor?: number | null;
      cancel_at?: number | null;
      cancel_at_period_end?: boolean | null;
      canceled_at?: number | null;
      created?: number | null;
      currency?: string | null;
      current_period_end?: number | null;
      current_period_start?: number | null;
      customer?: string | null;
      days_until_due?: number | null;
      default_payment_method?: string | null;
      default_source?: string | null;
      description?: string | null;
      ended_at?: number | null;
      latest_invoice?: string | null;
      start_date?: number | null;
      status?: string | null;
      items?: {
        __typename?: 'StripeSubscriptionItemList';
        data: Array<{
          __typename?: 'StripeSubscriptionItem';
          price: { __typename?: 'StripePrice'; unit_amount?: number | null };
        }>;
      } | null;
      metadata?: {
        __typename?: 'StripeSubscriptionMetadata';
        companyId?: number | null;
        type?: string | null;
      } | null;
    } | null;
  }>;
};

export const ContractsDocument = gql`
  query Contracts(
    $where: ContractWhereInput
    $skip: Int
    $take: Int
    $orderBy: [ContractOrderByWithRelationInput!]
  ) {
    contracts(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      companyId
      externalProviderId
      subscriptionExpireDate
      planId
      renewalInterval
      startDate
      endDate
      usageType
      usageAmount
      usageInterval
      usageIntervalCount
      plan {
        id
        slug
        product {
          slug
        }
      }
      subscription {
        id
        object
        billing_cycle_anchor
        cancel_at
        cancel_at_period_end
        canceled_at
        created
        currency
        current_period_end
        current_period_start
        customer
        days_until_due
        default_payment_method
        default_source
        description
        ended_at
        items {
          data {
            price {
              unit_amount
            }
          }
        }
        latest_invoice
        metadata {
          companyId
          type
        }
        start_date
        status
      }
    }
  }
`;

/**
 * __useContractsQuery__
 *
 * To run a query within a React component, call `useContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useContractsQuery(
  baseOptions?: Apollo.QueryHookOptions<ContractsQuery, ContractsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ContractsQuery, ContractsQueryVariables>(
    ContractsDocument,
    options
  );
}
export function useContractsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContractsQuery,
    ContractsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ContractsQuery, ContractsQueryVariables>(
    ContractsDocument,
    options
  );
}
export function useContractsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ContractsQuery,
    ContractsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ContractsQuery, ContractsQueryVariables>(
    ContractsDocument,
    options
  );
}
export type ContractsQueryHookResult = ReturnType<typeof useContractsQuery>;
export type ContractsLazyQueryHookResult = ReturnType<
  typeof useContractsLazyQuery
>;
export type ContractsSuspenseQueryHookResult = ReturnType<
  typeof useContractsSuspenseQuery
>;
export type ContractsQueryResult = Apollo.QueryResult<
  ContractsQuery,
  ContractsQueryVariables
>;
