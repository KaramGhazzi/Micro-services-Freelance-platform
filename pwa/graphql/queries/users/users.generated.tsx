import * as Types from '../../types';

import { gql } from '@apollo/client';
import { UserFragmentDoc } from '../../fragments/userFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersQueryVariables = Types.Exact<{
  where: Types.UserWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.UserOrderByWithRelationInput>
    | Types.UserOrderByWithRelationInput
  >;
}>;

export type UsersQuery = {
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

export const UsersDocument = gql`
  query users(
    $where: UserWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [UserOrderByWithRelationInput!]
  ) {
    count: countUsers(where: $where)
    users(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
      ...userFragment
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables> &
    ({ variables: UsersQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<
  typeof useUsersSuspenseQuery
>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
