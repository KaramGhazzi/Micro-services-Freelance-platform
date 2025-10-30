import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentApplicationFragmentDoc } from '../../fragments/assignmentApplicationFragment.generated';
import { AssignmentCardFragmentDoc } from '../../fragments/assignmentCardFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SentAssignmentApplicationsQueryVariables = Types.Exact<{
  where: Types.AssignmentApplicationWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.AssignmentApplicationOrderByWithRelationInput>
    | Types.AssignmentApplicationOrderByWithRelationInput
  >;
}>;

export type SentAssignmentApplicationsQuery = {
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

export const SentAssignmentApplicationsDocument = gql`
  query SentAssignmentApplications(
    $where: AssignmentApplicationWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [AssignmentApplicationOrderByWithRelationInput!]
  ) {
    count: countSentAssignmentApplications(where: $where)
    assignmentApplications: sentAssignmentApplications(
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
 * __useSentAssignmentApplicationsQuery__
 *
 * To run a query within a React component, call `useSentAssignmentApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSentAssignmentApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSentAssignmentApplicationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSentAssignmentApplicationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SentAssignmentApplicationsQuery,
    SentAssignmentApplicationsQueryVariables
  > &
    (
      | { variables: SentAssignmentApplicationsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SentAssignmentApplicationsQuery,
    SentAssignmentApplicationsQueryVariables
  >(SentAssignmentApplicationsDocument, options);
}
export function useSentAssignmentApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SentAssignmentApplicationsQuery,
    SentAssignmentApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SentAssignmentApplicationsQuery,
    SentAssignmentApplicationsQueryVariables
  >(SentAssignmentApplicationsDocument, options);
}
export function useSentAssignmentApplicationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SentAssignmentApplicationsQuery,
    SentAssignmentApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SentAssignmentApplicationsQuery,
    SentAssignmentApplicationsQueryVariables
  >(SentAssignmentApplicationsDocument, options);
}
export type SentAssignmentApplicationsQueryHookResult = ReturnType<
  typeof useSentAssignmentApplicationsQuery
>;
export type SentAssignmentApplicationsLazyQueryHookResult = ReturnType<
  typeof useSentAssignmentApplicationsLazyQuery
>;
export type SentAssignmentApplicationsSuspenseQueryHookResult = ReturnType<
  typeof useSentAssignmentApplicationsSuspenseQuery
>;
export type SentAssignmentApplicationsQueryResult = Apollo.QueryResult<
  SentAssignmentApplicationsQuery,
  SentAssignmentApplicationsQueryVariables
>;
