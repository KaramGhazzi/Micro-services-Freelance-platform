import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentsFragmentDoc } from './assignmentsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAssignmentsQueryVariables = Types.Exact<{
  where: Types.AssignmentWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.AssignmentOrderByWithRelationInput>
    | Types.AssignmentOrderByWithRelationInput
  >;
}>;

export type GetAssignmentsQuery = {
  __typename?: 'Query';
  count: number;
  assignments?: Array<{
    __typename?: 'Assignment';
    isRandomlyVisible: boolean;
    isFavorite: boolean;
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

export const GetAssignmentsDocument = gql`
  query getAssignments(
    $where: AssignmentWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [AssignmentOrderByWithRelationInput!]
  ) {
    count: countAssignments(where: $where)
    assignments(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
      ...assignmentsFragment
      isRandomlyVisible
      isFavorite
    }
  }
  ${AssignmentsFragmentDoc}
`;

/**
 * __useGetAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetAssignmentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAssignmentsQuery,
    GetAssignmentsQueryVariables
  > &
    (
      | { variables: GetAssignmentsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAssignmentsQuery, GetAssignmentsQueryVariables>(
    GetAssignmentsDocument,
    options
  );
}
export function useGetAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAssignmentsQuery,
    GetAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAssignmentsQuery, GetAssignmentsQueryVariables>(
    GetAssignmentsDocument,
    options
  );
}
export function useGetAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAssignmentsQuery,
    GetAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAssignmentsQuery,
    GetAssignmentsQueryVariables
  >(GetAssignmentsDocument, options);
}
export type GetAssignmentsQueryHookResult = ReturnType<
  typeof useGetAssignmentsQuery
>;
export type GetAssignmentsLazyQueryHookResult = ReturnType<
  typeof useGetAssignmentsLazyQuery
>;
export type GetAssignmentsSuspenseQueryHookResult = ReturnType<
  typeof useGetAssignmentsSuspenseQuery
>;
export type GetAssignmentsQueryResult = Apollo.QueryResult<
  GetAssignmentsQuery,
  GetAssignmentsQueryVariables
>;
