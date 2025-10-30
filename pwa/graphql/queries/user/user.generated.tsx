import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type UserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    email: string;
    emailChange?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: any | null;
    phoneNumber?: string | null;
    createdAt: any;
    updatedAt: any;
    confirmedAt?: any | null;
    confirmationToken?: string | null;
    linkedInUrl?: string | null;
    settings?: Array<{
      __typename?: 'Setting';
      id: string;
      key: string;
      type: Types.SettingType;
      value: string;
    }> | null;
    assignments?: Array<{ __typename?: 'Assignment'; id: string }> | null;
    userCompanies?: Array<{
      __typename?: 'UsersCompanies';
      companyId: number;
      company: {
        __typename?: 'Company';
        name?: string | null;
        type: Types.CompanyType;
      };
      userCompanyRoles?: Array<{
        __typename?: 'UsersCompanyRoles';
        role: Types.UserCompanyRole;
      }> | null;
    }> | null;
  } | null;
};

export const UserDocument = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      email
      emailChange
      firstName
      lastName
      dateOfBirth
      phoneNumber
      createdAt
      updatedAt
      confirmedAt
      confirmationToken
      settings {
        id
        key
        type
        value
      }
      assignments {
        id
      }
      linkedInUrl
      userCompanies {
        companyId
        company {
          name
          type
        }
        userCompanyRoles {
          role
        }
      }
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> &
    ({ variables: UserQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export function useUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<
  typeof useUserSuspenseQuery
>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
