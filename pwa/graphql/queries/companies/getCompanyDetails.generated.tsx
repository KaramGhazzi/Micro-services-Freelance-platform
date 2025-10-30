import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyFragmentDoc } from '../../fragments/companyFragment.generated';
import {
  CompanyAddressFragmentDoc,
  CompanyBillingAddressFragmentDoc,
} from '../../fragments/companyBillingAddressFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompanyDetailsQueryVariables = Types.Exact<{
  where: Types.CompanyWhereInput;
  orderBy?: Types.InputMaybe<
    | Array<Types.CompanyOrderByWithRelationInput>
    | Types.CompanyOrderByWithRelationInput
  >;
}>;

export type CompanyDetailsQuery = {
  __typename?: 'Query';
  company: {
    __typename?: 'Company';
    cocNumber?: string | null;
    billingEmail?: string | null;
    vatNumber?: string | null;
    websiteUrl?: string | null;
    id: string;
    name?: string | null;
    assignmentCount: number;
    openAssignmentCount: number;
    recruiterCount: number;
    latestTopReviewText?: string | null;
    createdAt: any;
    type: Types.CompanyType;
    contracts: Array<{
      __typename?: 'Contract';
      id: string;
      startDate: any;
      endDate?: any | null;
      renewalInterval?: Types.RenewalInterval | null;
      usageInterval?: Types.Interval | null;
      usageAmount?: number | null;
      plan: {
        __typename?: 'Plan';
        product: {
          __typename?: 'Product';
          slug: Types.ProductSlug;
          name: string;
        };
      };
    }>;
    companyUsers?: Array<{
      __typename?: 'UsersCompanies';
      status: Types.UsersCompaniesStatus;
      user: {
        __typename?: 'User';
        id: string;
        firstName?: string | null;
        lastName?: string | null;
        role: Types.UserRole;
        profilePhoto?: {
          __typename?: 'File';
          blobName: string;
          id: string;
          name: string;
          uuid: string;
          container: string;
        } | null;
      };
    }> | null;
    coverImageFile?: {
      __typename?: 'File';
      container: string;
      blobName: string;
      name: string;
    } | null;
    address?: {
      __typename?: 'Address';
      id: string;
      name?: string | null;
      addressLine1: string;
      addressLine2?: string | null;
      postalCode: string;
      city: string;
      countryCode?: string | null;
    } | null;
    billingAddress?: {
      __typename?: 'Address';
      id: string;
      name?: string | null;
      addressLine1: string;
      addressLine2?: string | null;
      postalCode: string;
      city: string;
      countryCode?: string | null;
    } | null;
  };
};

export const CompanyDetailsDocument = gql`
  query CompanyDetails(
    $where: CompanyWhereInput!
    $orderBy: [CompanyOrderByWithRelationInput!]
  ) {
    company(where: $where, orderBy: $orderBy) {
      cocNumber
      billingEmail
      vatNumber
      websiteUrl
      contracts {
        id
        startDate
        endDate
        renewalInterval
        usageInterval
        usageAmount
        plan {
          product {
            slug
            name
          }
        }
      }
      ...companyFragment
      ...companyAddressFragment
      ...companyBillingAddressFragment
    }
  }
  ${CompanyFragmentDoc}
  ${CompanyAddressFragmentDoc}
  ${CompanyBillingAddressFragmentDoc}
`;

/**
 * __useCompanyDetailsQuery__
 *
 * To run a query within a React component, call `useCompanyDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyDetailsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCompanyDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CompanyDetailsQuery,
    CompanyDetailsQueryVariables
  > &
    (
      | { variables: CompanyDetailsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompanyDetailsQuery, CompanyDetailsQueryVariables>(
    CompanyDetailsDocument,
    options
  );
}
export function useCompanyDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CompanyDetailsQuery,
    CompanyDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompanyDetailsQuery, CompanyDetailsQueryVariables>(
    CompanyDetailsDocument,
    options
  );
}
export function useCompanyDetailsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CompanyDetailsQuery,
    CompanyDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CompanyDetailsQuery,
    CompanyDetailsQueryVariables
  >(CompanyDetailsDocument, options);
}
export type CompanyDetailsQueryHookResult = ReturnType<
  typeof useCompanyDetailsQuery
>;
export type CompanyDetailsLazyQueryHookResult = ReturnType<
  typeof useCompanyDetailsLazyQuery
>;
export type CompanyDetailsSuspenseQueryHookResult = ReturnType<
  typeof useCompanyDetailsSuspenseQuery
>;
export type CompanyDetailsQueryResult = Apollo.QueryResult<
  CompanyDetailsQuery,
  CompanyDetailsQueryVariables
>;
