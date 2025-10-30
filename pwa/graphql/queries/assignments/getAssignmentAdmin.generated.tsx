import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullAssignmentInfoFragmentDoc } from '../../fragments/fullAssignmentInfoFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAssignmentAdminQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AssignmentWhereInput>;
}>;

export type GetAssignmentAdminQuery = {
  __typename?: 'Query';
  assignmentAdmin?: {
    __typename?: 'Assignment';
    id: string;
    uuid: string;
    description?: string | null;
    title?: string | null;
    createdAt: any;
    publishAt?: any | null;
    status?: Types.AssignmentStatus | null;
    contractType?: Types.ContractType | null;
    externalCode?: string | null;
    applicationDeadlineDate?: any | null;
    onLocation?: Types.OnLocation | null;
    province?: string | null;
    place?: string | null;
    startDate?: any | null;
    duration?: number | null;
    durationType?: Types.DurationType | null;
    durationExtendable: boolean;
    hoursFrom?: number | null;
    hoursTo?: number | null;
    rateType?: Types.RateType | null;
    rateFrom?: number | null;
    rateTo?: number | null;
    type?: Types.AssignmentType | null;
    commentsCount: number;
    viewsCount: number;
    descriptionIsVisible: boolean;
    descriptionIsVisibleFrom?: any | null;
    notVisibleReason?: Types.AssignmentNotVisibleReason | null;
    companyId: number;
    customerRelation?: Types.CustomerRelation | null;
    customerRelationCompany?: string | null;
    customerRelationCompanyVisible: boolean;
    hideInDescription: boolean;
    isFavorite: boolean;
    startAsap: boolean;
    applyEnabled: boolean;
    reviewEnabled: boolean;
    statusHistory: Array<{
      __typename?: 'Status';
      createdAt: any;
      id: string;
      key: string;
      modelId?: number | null;
      modelType: Types.StatusModelType;
    }>;
    owner: {
      __typename?: 'User';
      firstName?: string | null;
      lastName?: string | null;
      id: string;
      profilePhoto?: {
        __typename?: 'File';
        blobName: string;
        container: string;
      } | null;
    };
    currentStatus: {
      __typename?: 'Status';
      key: string;
      description?: string | null;
    };
    company: {
      __typename?: 'Company';
      id: string;
      name?: string | null;
      assignmentCount: number;
      openAssignmentCount: number;
      recruiterCount: number;
      latestTopReviewText?: string | null;
      about?: string | null;
      createdAt: any;
      type: Types.CompanyType;
      coverImageFile?: {
        __typename?: 'File';
        blobName: string;
        container: string;
      } | null;
      logoImageFile?: {
        __typename?: 'File';
        blobName: string;
        container: string;
      } | null;
    };
    assignmentApplications?: Array<{
      __typename?: 'AssignmentApplication';
      uuid: string;
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
      _count: { __typename?: 'AssignmentApplicationCount'; documents: number };
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
    expertises?: Array<{
      __typename?: 'AssignmentExpertise';
      id: string;
      expertise: Types.ExpertiseType;
    }> | null;
  } | null;
};

export const GetAssignmentAdminDocument = gql`
  query getAssignmentAdmin($where: AssignmentWhereInput) {
    assignmentAdmin(where: $where) {
      ...fullAssignmentInfoFragment
      statusHistory {
        createdAt
        id
        key
        modelId
        modelType
      }
    }
  }
  ${FullAssignmentInfoFragmentDoc}
`;

/**
 * __useGetAssignmentAdminQuery__
 *
 * To run a query within a React component, call `useGetAssignmentAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentAdminQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAssignmentAdminQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAssignmentAdminQuery,
    GetAssignmentAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAssignmentAdminQuery,
    GetAssignmentAdminQueryVariables
  >(GetAssignmentAdminDocument, options);
}
export function useGetAssignmentAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAssignmentAdminQuery,
    GetAssignmentAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAssignmentAdminQuery,
    GetAssignmentAdminQueryVariables
  >(GetAssignmentAdminDocument, options);
}
export function useGetAssignmentAdminSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAssignmentAdminQuery,
    GetAssignmentAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAssignmentAdminQuery,
    GetAssignmentAdminQueryVariables
  >(GetAssignmentAdminDocument, options);
}
export type GetAssignmentAdminQueryHookResult = ReturnType<
  typeof useGetAssignmentAdminQuery
>;
export type GetAssignmentAdminLazyQueryHookResult = ReturnType<
  typeof useGetAssignmentAdminLazyQuery
>;
export type GetAssignmentAdminSuspenseQueryHookResult = ReturnType<
  typeof useGetAssignmentAdminSuspenseQuery
>;
export type GetAssignmentAdminQueryResult = Apollo.QueryResult<
  GetAssignmentAdminQuery,
  GetAssignmentAdminQueryVariables
>;
