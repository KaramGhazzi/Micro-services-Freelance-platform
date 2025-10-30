import * as Types from '../types';

import { gql } from '@apollo/client';
import { AssignmentApplicationFragmentDoc } from './assignmentApplicationFragment.generated';
export type FullAssignmentInfoFragment = {
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
};

export const FullAssignmentInfoFragmentDoc = gql`
  fragment fullAssignmentInfoFragment on Assignment {
    id
    uuid
    description
    title
    owner {
      firstName
      lastName
      id
      profilePhoto {
        blobName
        container
      }
    }
    currentStatus {
      key
      description
    }
    createdAt
    publishAt
    status
    contractType
    externalCode
    applicationDeadlineDate
    onLocation
    province
    place
    startDate
    duration
    durationType
    durationExtendable
    hoursFrom
    hoursTo
    rateType
    rateFrom
    rateTo
    type
    commentsCount
    viewsCount
    description
    descriptionIsVisible
    descriptionIsVisibleFrom
    notVisibleReason
    companyId
    company {
      id
      name
      assignmentCount
      openAssignmentCount
      recruiterCount
      latestTopReviewText
      about
      createdAt
      coverImageFile {
        blobName
        container
      }
      logoImageFile {
        blobName
        container
      }
      createdAt
      type
    }
    customerRelation
    customerRelationCompany
    customerRelationCompanyVisible
    hideInDescription
    isFavorite
    startAsap
    assignmentApplications {
      ...assignmentApplicationFragment
      uuid
      _count {
        documents
      }
    }
    expertises {
      id
      expertise
    }
    applyEnabled
    reviewEnabled
  }
  ${AssignmentApplicationFragmentDoc}
`;
