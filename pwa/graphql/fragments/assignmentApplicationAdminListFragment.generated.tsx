import * as Types from '../types';

import { gql } from '@apollo/client';
export type AssignmentApplicationAdminListFragment = {
  __typename?: 'AssignmentApplication';
  id: string;
  createdAt: any;
  status: Types.AssignmentApplicationStatus;
  currentStatus: {
    __typename?: 'Status';
    key: string;
    description?: string | null;
    createdAt: any;
  };
  owner: {
    __typename?: 'User';
    firstName?: string | null;
    lastName?: string | null;
    profilePhoto?: {
      __typename?: 'File';
      blobName: string;
      id: string;
      name: string;
      uuid: string;
      container: string;
    } | null;
  };
};

export const AssignmentApplicationAdminListFragmentDoc = gql`
  fragment assignmentApplicationAdminListFragment on AssignmentApplication {
    id
    createdAt
    status
    currentStatus {
      key
      description
      createdAt
    }
    owner {
      firstName
      lastName
      profilePhoto {
        blobName
        id
        name
        uuid
        container
      }
    }
  }
`;
