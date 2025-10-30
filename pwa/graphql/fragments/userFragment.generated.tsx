import * as Types from '../types';

import { gql } from '@apollo/client';
export type UserFragment = {
  __typename?: 'User';
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  createdAt: any;
  role: Types.UserRole;
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
    status: Types.UsersCompaniesStatus;
    company: {
      __typename?: 'Company';
      id: string;
      name?: string | null;
      type: Types.CompanyType;
      contracts: Array<{
        __typename?: 'Contract';
        endDate?: any | null;
        plan: {
          __typename?: 'Plan';
          product: { __typename?: 'Product'; slug: Types.ProductSlug };
        };
      }>;
    };
    userCompanyRoles?: Array<{
      __typename?: 'UsersCompanyRoles';
      role: Types.UserCompanyRole;
    }> | null;
  }> | null;
  assignments?: Array<{
    __typename?: 'Assignment';
    id: string;
    status?: Types.AssignmentStatus | null;
  }> | null;
};

export const UserFragmentDoc = gql`
  fragment userFragment on User {
    id
    email
    firstName
    lastName
    phoneNumber
    createdAt
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
      status
      company {
        id
        name
        type
        contracts {
          endDate
          plan {
            product {
              slug
            }
          }
        }
      }
      userCompanyRoles {
        role
      }
    }
    assignments {
      id
      status
    }
  }
`;
