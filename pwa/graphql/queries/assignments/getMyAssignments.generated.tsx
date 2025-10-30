import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentsFragmentDoc } from './assignmentsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyAssignmentsQueryVariables = Types.Exact<{
  where: Types.AssignmentWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.AssignmentOrderByWithRelationInput>
    | Types.AssignmentOrderByWithRelationInput
  >;
}>;

export type GetMyAssignmentsQuery = {
  __typename?: 'Query';
  count: number;
  assignments?: Array<{
    __typename?: 'Assignment';
    id: string;
    uuid: string;
    description?: string | null;
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
    assignmentApplications?: Array<{
      __typename?: 'AssignmentApplication';
      id: string;
      uuid: string;
      isRead: boolean;
      _count: { __typename?: 'AssignmentApplicationCount'; documents: number };
      owner: { __typename?: 'User'; id: string };
    }> | null;
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
  }> | null;
};

export const GetMyAssignmentsDocument = gql`
  query getMyAssignments(
    $where: AssignmentWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [AssignmentOrderByWithRelationInput!]
  ) {
    count: countMyAssignments(where: $where)
    assignments: myAssignments(
      where: $where
      skip: $skip
      take: $take
      orderBy: $orderBy
    ) {
      ...assignmentsFragment
    }
  }
  ${AssignmentsFragmentDoc}
`;

/**
 * __useGetMyAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetMyAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAssignmentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetMyAssignmentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMyAssignmentsQuery,
    GetMyAssignmentsQueryVariables
  > &
    (
      | { variables: GetMyAssignmentsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyAssignmentsQuery, GetMyAssignmentsQueryVariables>(
    GetMyAssignmentsDocument,
    options
  );
}
export function useGetMyAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyAssignmentsQuery,
    GetMyAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyAssignmentsQuery,
    GetMyAssignmentsQueryVariables
  >(GetMyAssignmentsDocument, options);
}
export function useGetMyAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyAssignmentsQuery,
    GetMyAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyAssignmentsQuery,
    GetMyAssignmentsQueryVariables
  >(GetMyAssignmentsDocument, options);
}
export type GetMyAssignmentsQueryHookResult = ReturnType<
  typeof useGetMyAssignmentsQuery
>;
export type GetMyAssignmentsLazyQueryHookResult = ReturnType<
  typeof useGetMyAssignmentsLazyQuery
>;
export type GetMyAssignmentsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyAssignmentsSuspenseQuery
>;
export type GetMyAssignmentsQueryResult = Apollo.QueryResult<
  GetMyAssignmentsQuery,
  GetMyAssignmentsQueryVariables
>;
