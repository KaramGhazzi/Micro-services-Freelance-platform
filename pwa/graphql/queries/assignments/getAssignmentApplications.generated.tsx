import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentApplicationFragmentDoc } from '../../fragments/assignmentApplicationFragment.generated';
import { AssignmentCardFragmentDoc } from '../../fragments/assignmentCardFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AssignmentApplicationsQueryVariables = Types.Exact<{
  where: Types.AssignmentApplicationWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.AssignmentApplicationOrderByWithRelationInput>
    | Types.AssignmentApplicationOrderByWithRelationInput
  >;
}>;

export type AssignmentApplicationsQuery = {
  __typename?: 'Query';
  count: number;
  assignmentApplications?: Array<{
    __typename?: 'AssignmentApplication';
    id: string;
    availability?: Types.Availability | null;
    availableHours?: number | null;
    background?: string | null;
    city?: string | null;
    createdAt: any;
    status: Types.AssignmentApplicationStatus;
    email?: string | null;
    expertises?: string | null;
    linkedInURL?: string | null;
    motivation?: string | null;
    personalQualities?: string | null;
    phoneNumber?: string | null;
    rateFrom?: number | null;
    rateTo?: number | null;
    rateType?: Types.RateType | null;
    updatedAt: any;
    websiteURL?: string | null;
    isRead: boolean;
    assignment: {
      __typename?: 'Assignment';
      id: string;
      title?: string | null;
      type?: Types.AssignmentType | null;
      rateType?: Types.RateType | null;
      publishAt?: any | null;
      createdAt: any;
      contractType?: Types.ContractType | null;
      updatedAt: any;
      commentsCount: number;
      viewsCount: number;
      externalCode?: string | null;
      status?: Types.AssignmentStatus | null;
      currentStatus: {
        __typename?: 'Status';
        key: string;
        description?: string | null;
      };
      company: { __typename?: 'Company'; id: string; name?: string | null };
      owner: {
        __typename?: 'User';
        id: string;
        firstName?: string | null;
        lastName?: string | null;
      };
    };
    company: { __typename?: 'Company'; id: string; name?: string | null };
    currentStatus: {
      __typename?: 'Status';
      key: string;
      description?: string | null;
      createdAt: any;
    };
    owner: {
      __typename?: 'User';
      externalId: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      id: string;
      profilePhoto?: {
        __typename?: 'File';
        container: string;
        blobName: string;
      } | null;
    };
  }> | null;
};

export const AssignmentApplicationsDocument = gql`
  query AssignmentApplications(
    $where: AssignmentApplicationWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [AssignmentApplicationOrderByWithRelationInput!]
  ) {
    count: countAssignmentApplications(where: $where)
    assignmentApplications(
      where: $where
      skip: $skip
      take: $take
      orderBy: $orderBy
    ) {
      ...assignmentApplicationFragment
      assignment {
        ...assignmentCardFragment
      }
    }
  }
  ${AssignmentApplicationFragmentDoc}
  ${AssignmentCardFragmentDoc}
`;

/**
 * __useAssignmentApplicationsQuery__
 *
 * To run a query within a React component, call `useAssignmentApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentApplicationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useAssignmentApplicationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AssignmentApplicationsQuery,
    AssignmentApplicationsQueryVariables
  > &
    (
      | { variables: AssignmentApplicationsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AssignmentApplicationsQuery,
    AssignmentApplicationsQueryVariables
  >(AssignmentApplicationsDocument, options);
}
export function useAssignmentApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AssignmentApplicationsQuery,
    AssignmentApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AssignmentApplicationsQuery,
    AssignmentApplicationsQueryVariables
  >(AssignmentApplicationsDocument, options);
}
export function useAssignmentApplicationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    AssignmentApplicationsQuery,
    AssignmentApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AssignmentApplicationsQuery,
    AssignmentApplicationsQueryVariables
  >(AssignmentApplicationsDocument, options);
}
export type AssignmentApplicationsQueryHookResult = ReturnType<
  typeof useAssignmentApplicationsQuery
>;
export type AssignmentApplicationsLazyQueryHookResult = ReturnType<
  typeof useAssignmentApplicationsLazyQuery
>;
export type AssignmentApplicationsSuspenseQueryHookResult = ReturnType<
  typeof useAssignmentApplicationsSuspenseQuery
>;
export type AssignmentApplicationsQueryResult = Apollo.QueryResult<
  AssignmentApplicationsQuery,
  AssignmentApplicationsQueryVariables
>;
