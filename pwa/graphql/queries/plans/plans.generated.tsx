import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PlansQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PlanWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.PlanOrderByWithRelationInput>
    | Types.PlanOrderByWithRelationInput
  >;
}>;

export type PlansQuery = {
  __typename?: 'Query';
  plans: Array<{
    __typename?: 'Plan';
    id: string;
    externalProviderId?: string | null;
    slug?: string | null;
    renewalInterval?: Types.RenewalInterval | null;
    productId: number;
    usageAmount?: number | null;
    price?: {
      __typename?: 'StripePrice';
      id: string;
      unit_amount?: number | null;
      currency: string;
    } | null;
    product: { __typename?: 'Product'; id: string; slug: Types.ProductSlug };
  }>;
};

export const PlansDocument = gql`
  query Plans(
    $where: PlanWhereInput
    $skip: Int
    $take: Int
    $orderBy: [PlanOrderByWithRelationInput!]
  ) {
    plans(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      externalProviderId
      slug
      renewalInterval
      price {
        id
        unit_amount
        currency
      }
      product {
        id
        slug
      }
      productId
      usageAmount
    }
  }
`;

/**
 * __usePlansQuery__
 *
 * To run a query within a React component, call `usePlansQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlansQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function usePlansQuery(
  baseOptions?: Apollo.QueryHookOptions<PlansQuery, PlansQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlansQuery, PlansQueryVariables>(
    PlansDocument,
    options
  );
}
export function usePlansLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PlansQuery, PlansQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlansQuery, PlansQueryVariables>(
    PlansDocument,
    options
  );
}
export function usePlansSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<PlansQuery, PlansQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PlansQuery, PlansQueryVariables>(
    PlansDocument,
    options
  );
}
export type PlansQueryHookResult = ReturnType<typeof usePlansQuery>;
export type PlansLazyQueryHookResult = ReturnType<typeof usePlansLazyQuery>;
export type PlansSuspenseQueryHookResult = ReturnType<
  typeof usePlansSuspenseQuery
>;
export type PlansQueryResult = Apollo.QueryResult<
  PlansQuery,
  PlansQueryVariables
>;
