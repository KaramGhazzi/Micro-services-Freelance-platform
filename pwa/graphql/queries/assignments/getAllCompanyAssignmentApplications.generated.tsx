import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentApplicationAdminListFragmentDoc } from '../../fragments/assignmentApplicationAdminListFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllCompanyAssignmentApplicationsQueryVariables = Types.Exact<{
  companyId: Types.Scalars['Int']['input'];
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type GetAllCompanyAssignmentApplicationsQuery = {
  __typename?: 'Query';
  count: number;
  applications?: Array<{
    __typename?: 'AssignmentApplication';
    id: string;
    createdAt: any;
    status: Types.AssignmentApplicationStatus;
    assignment: {
      __typename?: 'Assignment';
      id: string;
      title?: string | null;
      owner: {
        __typename?: 'User';
        firstName?: string | null;
        lastName?: string | null;
      };
      company: { __typename?: 'Company'; name?: string | null };
    };
    currentStatus: {
      __typename?: 'Status';
      key: string;
      description?: string | null;
      createdAt: any;
    };
    owner: {
      __typename?: 'User';
      firstName?: string | null;
      lastName?: string | null;
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
};

export const GetAllCompanyAssignmentApplicationsDocument = gql`
  query getAllCompanyAssignmentApplications(
    $companyId: Int!
    $skip: Int
    $take: Int
  ) {
    count: countAllCompanyAssignmentApplications(companyId: $companyId)
    applications: allCompanyAssignmentApplications(
      companyId: $companyId
      skip: $skip
      take: $take
    ) {
      ...assignmentApplicationAdminListFragment
      assignment {
        id
        title
        owner {
          firstName
          lastName
        }
        company {
          name
        }
      }
    }
  }
  ${AssignmentApplicationAdminListFragmentDoc}
`;

/**
 * __useGetAllCompanyAssignmentApplicationsQuery__
 *
 * To run a query within a React component, call `useGetAllCompanyAssignmentApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCompanyAssignmentApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCompanyAssignmentApplicationsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetAllCompanyAssignmentApplicationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllCompanyAssignmentApplicationsQuery,
    GetAllCompanyAssignmentApplicationsQueryVariables
  > &
    (
      | {
          variables: GetAllCompanyAssignmentApplicationsQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllCompanyAssignmentApplicationsQuery,
    GetAllCompanyAssignmentApplicationsQueryVariables
  >(GetAllCompanyAssignmentApplicationsDocument, options);
}
export function useGetAllCompanyAssignmentApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllCompanyAssignmentApplicationsQuery,
    GetAllCompanyAssignmentApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllCompanyAssignmentApplicationsQuery,
    GetAllCompanyAssignmentApplicationsQueryVariables
  >(GetAllCompanyAssignmentApplicationsDocument, options);
}
export function useGetAllCompanyAssignmentApplicationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAllCompanyAssignmentApplicationsQuery,
    GetAllCompanyAssignmentApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllCompanyAssignmentApplicationsQuery,
    GetAllCompanyAssignmentApplicationsQueryVariables
  >(GetAllCompanyAssignmentApplicationsDocument, options);
}
export type GetAllCompanyAssignmentApplicationsQueryHookResult = ReturnType<
  typeof useGetAllCompanyAssignmentApplicationsQuery
>;
export type GetAllCompanyAssignmentApplicationsLazyQueryHookResult = ReturnType<
  typeof useGetAllCompanyAssignmentApplicationsLazyQuery
>;
export type GetAllCompanyAssignmentApplicationsSuspenseQueryHookResult =
  ReturnType<typeof useGetAllCompanyAssignmentApplicationsSuspenseQuery>;
export type GetAllCompanyAssignmentApplicationsQueryResult = Apollo.QueryResult<
  GetAllCompanyAssignmentApplicationsQuery,
  GetAllCompanyAssignmentApplicationsQueryVariables
>;
