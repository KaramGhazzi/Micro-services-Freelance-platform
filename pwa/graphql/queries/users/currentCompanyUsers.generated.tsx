import * as Types from '../../types';

import { gql } from '@apollo/client';
import { UserFragmentDoc } from '../../fragments/userFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentCompanyUsersQueryVariables = Types.Exact<{
  where: Types.UserWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.UserOrderByWithRelationInput>
    | Types.UserOrderByWithRelationInput
  >;
}>;

export type CurrentCompanyUsersQuery = {
  __typename?: 'Query';
  count: number;
  users: Array<{
    __typename?: 'User';
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    createdAt: any;
    role: Types.UserRole;
    profilePhoto?: {
      __typename?: 'File';
      blobName: string;
      id: string;
      name: string;
      uuid: string;
      container: string;
    } | null;
    userCompanies?: Array<{
      __typename?: 'UsersCompanies';
      id: string;
      status: Types.UsersCompaniesStatus;
      company: {
        __typename?: 'Company';
        id: string;
        name?: string | null;
        type: Types.CompanyType;
        contracts: Array<{
          __typename?: 'Contract';
          endDate?: any | null;
          plan: {
            __typename?: 'Plan';
            product: { __typename?: 'Product'; slug: Types.ProductSlug };
          };
        }>;
      };
      userCompanyRoles?: Array<{
        __typename?: 'UsersCompanyRoles';
        role: Types.UserCompanyRole;
      }> | null;
    }> | null;
    assignments?: Array<{
      __typename?: 'Assignment';
      id: string;
      status?: Types.AssignmentStatus | null;
    }> | null;
  }>;
};

export const CurrentCompanyUsersDocument = gql`
  query currentCompanyUsers(
    $where: UserWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [UserOrderByWithRelationInput!]
  ) {
    count: countCurrentCompanyUsers(where: $where)
    users: currentCompanyUsers(
      where: $where
      skip: $skip
      take: $take
      orderBy: $orderBy
    ) {
      ...userFragment
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useCurrentCompanyUsersQuery__
 *
 * To run a query within a React component, call `useCurrentCompanyUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentCompanyUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentCompanyUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCurrentCompanyUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    CurrentCompanyUsersQuery,
    CurrentCompanyUsersQueryVariables
  > &
    (
      | { variables: CurrentCompanyUsersQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CurrentCompanyUsersQuery,
    CurrentCompanyUsersQueryVariables
  >(CurrentCompanyUsersDocument, options);
}
export function useCurrentCompanyUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentCompanyUsersQuery,
    CurrentCompanyUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CurrentCompanyUsersQuery,
    CurrentCompanyUsersQueryVariables
  >(CurrentCompanyUsersDocument, options);
}
export function useCurrentCompanyUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CurrentCompanyUsersQuery,
    CurrentCompanyUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CurrentCompanyUsersQuery,
    CurrentCompanyUsersQueryVariables
  >(CurrentCompanyUsersDocument, options);
}
export type CurrentCompanyUsersQueryHookResult = ReturnType<
  typeof useCurrentCompanyUsersQuery
>;
export type CurrentCompanyUsersLazyQueryHookResult = ReturnType<
  typeof useCurrentCompanyUsersLazyQuery
>;
export type CurrentCompanyUsersSuspenseQueryHookResult = ReturnType<
  typeof useCurrentCompanyUsersSuspenseQuery
>;
export type CurrentCompanyUsersQueryResult = Apollo.QueryResult<
  CurrentCompanyUsersQuery,
  CurrentCompanyUsersQueryVariables
>;
