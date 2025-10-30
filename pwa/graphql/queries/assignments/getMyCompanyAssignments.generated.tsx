import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentsFragmentDoc } from './assignmentsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyCompanyAssignmentsQueryVariables = Types.Exact<{
  where: Types.AssignmentWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.AssignmentOrderByWithRelationInput>
    | Types.AssignmentOrderByWithRelationInput
  >;
}>;

export type GetMyCompanyAssignmentsQuery = {
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

export const GetMyCompanyAssignmentsDocument = gql`
  query getMyCompanyAssignments(
    $where: AssignmentWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [AssignmentOrderByWithRelationInput!]
  ) {
    count: countMyCompanyAssignments(where: $where)
    assignments: myCompanyAssignments(
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
 * __useGetMyCompanyAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetMyCompanyAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCompanyAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCompanyAssignmentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetMyCompanyAssignmentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMyCompanyAssignmentsQuery,
    GetMyCompanyAssignmentsQueryVariables
  > &
    (
      | { variables: GetMyCompanyAssignmentsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMyCompanyAssignmentsQuery,
    GetMyCompanyAssignmentsQueryVariables
  >(GetMyCompanyAssignmentsDocument, options);
}
export function useGetMyCompanyAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyCompanyAssignmentsQuery,
    GetMyCompanyAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyCompanyAssignmentsQuery,
    GetMyCompanyAssignmentsQueryVariables
  >(GetMyCompanyAssignmentsDocument, options);
}
export function useGetMyCompanyAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyCompanyAssignmentsQuery,
    GetMyCompanyAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyCompanyAssignmentsQuery,
    GetMyCompanyAssignmentsQueryVariables
  >(GetMyCompanyAssignmentsDocument, options);
}
export type GetMyCompanyAssignmentsQueryHookResult = ReturnType<
  typeof useGetMyCompanyAssignmentsQuery
>;
export type GetMyCompanyAssignmentsLazyQueryHookResult = ReturnType<
  typeof useGetMyCompanyAssignmentsLazyQuery
>;
export type GetMyCompanyAssignmentsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyCompanyAssignmentsSuspenseQuery
>;
export type GetMyCompanyAssignmentsQueryResult = Apollo.QueryResult<
  GetMyCompanyAssignmentsQuery,
  GetMyCompanyAssignmentsQueryVariables
>;
