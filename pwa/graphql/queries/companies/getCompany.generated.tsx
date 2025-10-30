import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyFragmentDoc } from '../../fragments/companyFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompanyQueryVariables = Types.Exact<{
  where: Types.CompanyWhereInput;
  orderBy?: Types.InputMaybe<
    | Array<Types.CompanyOrderByWithRelationInput>
    | Types.CompanyOrderByWithRelationInput
  >;
}>;

export type CompanyQuery = {
  __typename?: 'Query';
  company: {
    __typename?: 'Company';
    id: string;
    name?: string | null;
    assignmentCount: number;
    openAssignmentCount: number;
    recruiterCount: number;
    latestTopReviewText?: string | null;
    createdAt: any;
    type: Types.CompanyType;
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
  };
};

export const CompanyDocument = gql`
  query Company(
    $where: CompanyWhereInput!
    $orderBy: [CompanyOrderByWithRelationInput!]
  ) {
    company(where: $where, orderBy: $orderBy) {
      ...companyFragment
    }
  }
  ${CompanyFragmentDoc}
`;

/**
 * __useCompanyQuery__
 *
 * To run a query within a React component, call `useCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCompanyQuery(
  baseOptions: Apollo.QueryHookOptions<CompanyQuery, CompanyQueryVariables> &
    ({ variables: CompanyQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompanyQuery, CompanyQueryVariables>(
    CompanyDocument,
    options
  );
}
export function useCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CompanyQuery, CompanyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompanyQuery, CompanyQueryVariables>(
    CompanyDocument,
    options
  );
}
export function useCompanySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CompanyQuery,
    CompanyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CompanyQuery, CompanyQueryVariables>(
    CompanyDocument,
    options
  );
}
export type CompanyQueryHookResult = ReturnType<typeof useCompanyQuery>;
export type CompanyLazyQueryHookResult = ReturnType<typeof useCompanyLazyQuery>;
export type CompanySuspenseQueryHookResult = ReturnType<
  typeof useCompanySuspenseQuery
>;
export type CompanyQueryResult = Apollo.QueryResult<
  CompanyQuery,
  CompanyQueryVariables
>;
