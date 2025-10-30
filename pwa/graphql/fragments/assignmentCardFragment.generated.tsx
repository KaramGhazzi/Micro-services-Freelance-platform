import * as Types from '../types';

import { gql } from '@apollo/client';
export type AssignmentCardFragment = {
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
  currentStatus: {
    __typename?: 'Status';
    key: string;
    description?: string | null;
  };
  company: { __typename?: 'Company'; id: string; name?: string | null };
  owner: {
    __typename?: 'User';
    id: string;
    firstName?: string | null;
    lastName?: string | null;
  };
};

export const AssignmentCardFragmentDoc = gql`
  fragment assignmentCardFragment on Assignment {
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
      firstName
      lastName
    }
  }
`;
