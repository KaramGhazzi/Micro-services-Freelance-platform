import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentsFragmentDoc } from './assignmentsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AssignmentsAdminQueryVariables = Types.Exact<{
  where: Types.AssignmentWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.AssignmentOrderByWithRelationInput>
    | Types.AssignmentOrderByWithRelationInput
  >;
}>;

export type AssignmentsAdminQuery = {
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

export const AssignmentsAdminDocument = gql`
  query assignmentsAdmin(
    $where: AssignmentWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [AssignmentOrderByWithRelationInput!]
  ) {
    count: countAssignmentsAdmin(where: $where)
    assignments: assignmentsAdmin(
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
 * __useAssignmentsAdminQuery__
 *
 * To run a query within a React component, call `useAssignmentsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentsAdminQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useAssignmentsAdminQuery(
  baseOptions: Apollo.QueryHookOptions<
    AssignmentsAdminQuery,
    AssignmentsAdminQueryVariables
  > &
    (
      | { variables: AssignmentsAdminQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AssignmentsAdminQuery, AssignmentsAdminQueryVariables>(
    AssignmentsAdminDocument,
    options
  );
}
export function useAssignmentsAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AssignmentsAdminQuery,
    AssignmentsAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AssignmentsAdminQuery,
    AssignmentsAdminQueryVariables
  >(AssignmentsAdminDocument, options);
}
export function useAssignmentsAdminSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    AssignmentsAdminQuery,
    AssignmentsAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AssignmentsAdminQuery,
    AssignmentsAdminQueryVariables
  >(AssignmentsAdminDocument, options);
}
export type AssignmentsAdminQueryHookResult = ReturnType<
  typeof useAssignmentsAdminQuery
>;
export type AssignmentsAdminLazyQueryHookResult = ReturnType<
  typeof useAssignmentsAdminLazyQuery
>;
export type AssignmentsAdminSuspenseQueryHookResult = ReturnType<
  typeof useAssignmentsAdminSuspenseQuery
>;
export type AssignmentsAdminQueryResult = Apollo.QueryResult<
  AssignmentsAdminQuery,
  AssignmentsAdminQueryVariables
>;
