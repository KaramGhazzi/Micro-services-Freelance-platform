import * as Types from '../../types';

import { gql } from '@apollo/client';
import { AssignmentDetailFragmentDoc } from '../../fragments/assignmentDetailFragment.generated';
export type AssignmentsFragment = {
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
};

export const AssignmentsFragmentDoc = gql`
  fragment assignmentsFragment on Assignment {
    id
    uuid
    ...assignmentDetailFragment
    assignmentApplications {
      id
      uuid
      isRead
      _count {
        documents
      }
      owner {
        id
      }
    }
    description
  }
  ${AssignmentDetailFragmentDoc}
`;
