import * as Types from '../types';

import { gql } from '@apollo/client';
export type CompanyFragment = {
  __typename?: 'Company';
  id: string;
  name?: string | null;
  assignmentCount: number;
  openAssignmentCount: number;
  recruiterCount: number;
  latestTopReviewText?: string | null;
  createdAt: any;
  type: Types.CompanyType;
  companyUsers?: Array<{
    __typename?: 'UsersCompanies';
    status: Types.UsersCompaniesStatus;
    user: {
      __typename?: 'User';
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      role: Types.UserRole;
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
  coverImageFile?: {
    __typename?: 'File';
    container: string;
    blobName: string;
    name: string;
  } | null;
};

export const CompanyFragmentDoc = gql`
  fragment companyFragment on Company {
    id
    name
    companyUsers {
      status
      user {
        id
        firstName
        lastName
        role
        profilePhoto {
          blobName
          id
          name
          uuid
          container
        }
      }
    }
    assignmentCount
    openAssignmentCount
    recruiterCount
    latestTopReviewText
    createdAt
    coverImageFile {
      container
      blobName
      name
    }
    createdAt
    type
  }
`;
