import * as Types from '../../types';

import { gql } from '@apollo/client';
import {
  CompanyAddressFragmentDoc,
  CompanyBillingAddressFragmentDoc,
} from '../../fragments/companyBillingAddressFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  myNotificationCount: number;
  me: {
    __typename?: 'User';
    id: string;
    firebaseUid?: string | null;
    externalId: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    emailChange?: string | null;
    dateOfBirth?: any | null;
    phoneNumber?: string | null;
    linkedInUrl?: string | null;
    termsConditionsAcceptedAt?: any | null;
    termsConditionsVersion?: string | null;
    createdAt: any;
    updatedAt: any;
    role: Types.UserRole;
    settings?: Array<{
      __typename?: 'Setting';
      id: string;
      key: string;
      type: Types.SettingType;
      value: string;
    }> | null;
    profilePhoto?: {
      __typename?: 'File';
      blobName: string;
      id: string;
      name: string;
      uuid: string;
      container: string;
    } | null;
    userCompanies?: Array<{
      __typename?: 'UsersCompanies';
      id: string;
      company: {
        __typename?: 'Company';
        id: string;
        name?: string | null;
        email?: string | null;
        billingEmail?: string | null;
        type: Types.CompanyType;
        cocNumber?: string | null;
        vatNumber?: string | null;
        websiteUrl?: string | null;
        about?: string | null;
        youtubeUrl?: string | null;
        showCurrentAssignments: boolean;
        showEmployees: boolean;
        assignmentCount: number;
        openAssignmentCount: number;
        recruiterCount: number;
        latestTopReviewText?: string | null;
        createdAt: any;
        coverImageFile?: {
          __typename?: 'File';
          id: string;
          uuid: string;
          blobName: string;
          container: string;
        } | null;
        logoImageFile?: {
          __typename?: 'File';
          id: string;
          uuid: string;
          blobName: string;
          container: string;
        } | null;
        companyReferences?: Array<{
          __typename?: 'CompanyReference';
          id: string;
          content: string;
          companyId: number;
          refereeCompanyName: string;
          refereeJob: string;
          refereeFullName: string;
          referenceImageFile?: {
            __typename?: 'File';
            blobName: string;
            container: string;
          } | null;
        }> | null;
        address?: {
          __typename?: 'Address';
          id: string;
          name?: string | null;
          addressLine1: string;
          addressLine2?: string | null;
          postalCode: string;
          city: string;
          countryCode?: string | null;
        } | null;
        billingAddress?: {
          __typename?: 'Address';
          id: string;
          name?: string | null;
          addressLine1: string;
          addressLine2?: string | null;
          postalCode: string;
          city: string;
          countryCode?: string | null;
        } | null;
      };
      userCompanyRoles?: Array<{
        __typename?: 'UsersCompanyRoles';
        role: Types.UserCompanyRole;
      }> | null;
    }> | null;
  };
};

export const MeDocument = gql`
  query me {
    me {
      id
      firebaseUid
      externalId
      firstName
      lastName
      email
      emailChange
      dateOfBirth
      phoneNumber
      linkedInUrl
      settings {
        id
        key
        type
        value
      }
      termsConditionsAcceptedAt
      termsConditionsVersion
      createdAt
      updatedAt
      role
      profilePhoto {
        blobName
        id
        name
        uuid
        container
      }
      userCompanies {
        id
        company {
          id
          name
          email
          billingEmail
          type
          cocNumber
          vatNumber
          websiteUrl
          about
          youtubeUrl
          showCurrentAssignments
          showEmployees
          coverImageFile {
            id
            uuid
            blobName
            container
          }
          logoImageFile {
            id
            uuid
            blobName
            container
          }
          ...companyAddressFragment
          ...companyBillingAddressFragment
          companyReferences {
            id
            content
            companyId
            refereeCompanyName
            refereeJob
            refereeFullName
            referenceImageFile {
              blobName
              container
            }
          }
          assignmentCount
          openAssignmentCount
          recruiterCount
          latestTopReviewText
          createdAt
        }
        userCompanyRoles {
          role
        }
      }
    }
    myNotificationCount
  }
  ${CompanyAddressFragmentDoc}
  ${CompanyBillingAddressFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    options
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
