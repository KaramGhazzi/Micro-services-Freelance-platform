import * as Types from '../types';

import { gql } from '@apollo/client';
export type AssignmentApplicationFragment = {
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
};

export const AssignmentApplicationFragmentDoc = gql`
  fragment assignmentApplicationFragment on AssignmentApplication {
    id
    availability
    availableHours
    background
    city
    createdAt
    company {
      id
      name
    }
    status
    currentStatus {
      key
      description
      createdAt
    }
    email
    expertises
    id
    linkedInURL
    motivation
    owner {
      externalId
      firstName
      lastName
      email
      id
      profilePhoto {
        container
        blobName
      }
    }
    personalQualities
    phoneNumber
    rateFrom
    rateTo
    rateType
    updatedAt
    websiteURL
    isRead
  }
`;
