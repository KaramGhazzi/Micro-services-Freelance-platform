import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentApplicationFragmentDoc } from '../../fragments/assignmentApplicationFragment.generated';
import { AssignmentDetailFragmentDoc } from '../../fragments/assignmentDetailFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAssignmentApplicationAdminQueryVariables = Types.Exact<{
  where: Types.AssignmentApplicationWhereInput;
  orderBy?: Types.InputMaybe<
    | Array<Types.AssignmentApplicationOrderByWithRelationInput>
    | Types.AssignmentApplicationOrderByWithRelationInput
  >;
}>;

export type GetAssignmentApplicationAdminQuery = {
  __typename?: 'Query';
  assignmentApplicationAdmin?: {
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
      applyEnabled: boolean;
      reviewEnabled: boolean;
      expertises?: Array<{
        __typename?: 'AssignmentExpertise';
        id: string;
        expertise: Types.ExpertiseType;
      }> | null;
      currentStatus: {
        __typename?: 'Status';
        key: string;
        description?: string | null;
      };
      company: { __typename?: 'Company'; id: string; name?: string | null };
      owner: {
        __typename?: 'User';
        id: string;
        firebaseUid?: string | null;
        externalId: string;
        firstName?: string | null;
        lastName?: string | null;
        profilePhoto?: {
          __typename?: 'File';
          blobName: string;
          container: string;
        } | null;
      };
    };
    documents?: Array<{
      __typename?: 'AssignmentApplicationFile';
      file: {
        __typename?: 'File';
        name: string;
        uuid: string;
        container: string;
        blobName: string;
        size?: number | null;
      };
    }> | null;
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
  } | null;
};

export const GetAssignmentApplicationAdminDocument = gql`
  query getAssignmentApplicationAdmin(
    $where: AssignmentApplicationWhereInput!
    $orderBy: [AssignmentApplicationOrderByWithRelationInput!]
  ) {
    assignmentApplicationAdmin(where: $where, orderBy: $orderBy) {
      ...assignmentApplicationFragment
      assignment {
        ...assignmentDetailFragment
      }
      documents {
        file {
          name
          uuid
          container
          blobName
          size
        }
      }
    }
  }
  ${AssignmentApplicationFragmentDoc}
  ${AssignmentDetailFragmentDoc}
`;

/**
 * __useGetAssignmentApplicationAdminQuery__
 *
 * To run a query within a React component, call `useGetAssignmentApplicationAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentApplicationAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentApplicationAdminQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetAssignmentApplicationAdminQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAssignmentApplicationAdminQuery,
    GetAssignmentApplicationAdminQueryVariables
  > &
    (
      | {
          variables: GetAssignmentApplicationAdminQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAssignmentApplicationAdminQuery,
    GetAssignmentApplicationAdminQueryVariables
  >(GetAssignmentApplicationAdminDocument, options);
}
export function useGetAssignmentApplicationAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAssignmentApplicationAdminQuery,
    GetAssignmentApplicationAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAssignmentApplicationAdminQuery,
    GetAssignmentApplicationAdminQueryVariables
  >(GetAssignmentApplicationAdminDocument, options);
}
export function useGetAssignmentApplicationAdminSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAssignmentApplicationAdminQuery,
    GetAssignmentApplicationAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAssignmentApplicationAdminQuery,
    GetAssignmentApplicationAdminQueryVariables
  >(GetAssignmentApplicationAdminDocument, options);
}
export type GetAssignmentApplicationAdminQueryHookResult = ReturnType<
  typeof useGetAssignmentApplicationAdminQuery
>;
export type GetAssignmentApplicationAdminLazyQueryHookResult = ReturnType<
  typeof useGetAssignmentApplicationAdminLazyQuery
>;
export type GetAssignmentApplicationAdminSuspenseQueryHookResult = ReturnType<
  typeof useGetAssignmentApplicationAdminSuspenseQuery
>;
export type GetAssignmentApplicationAdminQueryResult = Apollo.QueryResult<
  GetAssignmentApplicationAdminQuery,
  GetAssignmentApplicationAdminQueryVariables
>;
