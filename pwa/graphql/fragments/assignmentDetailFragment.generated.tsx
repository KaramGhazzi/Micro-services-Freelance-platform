import * as Types from '../types';

import { gql } from '@apollo/client';
export type AssignmentDetailFragment = {
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

export const AssignmentDetailFragmentDoc = gql`
  fragment assignmentDetailFragment on Assignment {
    id
    title
    type
    rateType
    publishAt
    createdAt
    contractType
    updatedAt
    commentsCount
    viewsCount
    externalCode
    status
    expertises {
      id
      expertise
    }
    currentStatus {
      key
      description
    }
    company {
      id
      name
    }
    owner {
      id
      firebaseUid
      externalId
      firstName
      lastName
      profilePhoto {
        blobName
        container
      }
    }
    applyEnabled
    reviewEnabled
  }
`;
