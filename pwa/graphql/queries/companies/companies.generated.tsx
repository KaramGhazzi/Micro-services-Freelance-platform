import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompaniesQueryVariables = Types.Exact<{
  where: Types.CompanyWhereInput;
  orderBy?: Types.InputMaybe<
    | Array<Types.CompanyOrderByWithRelationInput>
    | Types.CompanyOrderByWithRelationInput
  >;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CompaniesQuery = {
  __typename?: 'Query';
  count: number;
  companies: Array<{
    __typename?: 'Company';
    id: string;
    name?: string | null;
    type: Types.CompanyType;
    cocNumber?: string | null;
    createdAt: any;
    address?: {
      __typename?: 'Address';
      addressLine1: string;
      postalCode: string;
      city: string;
    } | null;
    contracts: Array<{
      __typename?: 'Contract';
      endDate?: any | null;
      plan: {
        __typename?: 'Plan';
        product: { __typename?: 'Product'; slug: Types.ProductSlug };
      };
    }>;
    logoImageFile?: {
      __typename?: 'File';
      blobName: string;
      container: string;
    } | null;
  }>;
};

export const CompaniesDocument = gql`
  query companies(
    $where: CompanyWhereInput!
    $orderBy: [CompanyOrderByWithRelationInput!]
    $skip: Int
    $take: Int
  ) {
    count: countCompanies(where: $where)
    companies(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      id
      name
      type
      address {
        addressLine1
        postalCode
        city
      }
      cocNumber
      createdAt
      contracts {
        endDate
        plan {
          product {
            slug
          }
        }
      }
      logoImageFile {
        blobName
        container
      }
    }
  }
`;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCompaniesQuery(
  baseOptions: Apollo.QueryHookOptions<
    CompaniesQuery,
    CompaniesQueryVariables
  > &
    ({ variables: CompaniesQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(
    CompaniesDocument,
    options
  );
}
export function useCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CompaniesQuery,
    CompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(
    CompaniesDocument,
    options
  );
}
export function useCompaniesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CompaniesQuery,
    CompaniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CompaniesQuery, CompaniesQueryVariables>(
    CompaniesDocument,
    options
  );
}
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<
  typeof useCompaniesLazyQuery
>;
export type CompaniesSuspenseQueryHookResult = ReturnType<
  typeof useCompaniesSuspenseQuery
>;
export type CompaniesQueryResult = Apollo.QueryResult<
  CompaniesQuery,
  CompaniesQueryVariables
>;
