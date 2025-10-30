import * as Types from '../@generated/types';

export type RetrieveUserByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;

export type RetrieveUserByEmailQuery = {
  __typename?: 'Query';
  getUserByEmail: {
    __typename?: 'User';
    id: string;
    role: Types.UserRole;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    firebaseUid?: string | null;
    userCompanies?: Array<{
      __typename?: 'UsersCompanies';
      companyId: number;
      userCompanyRoles?: Array<{
        __typename?: 'UsersCompanyRoles';
        role: Types.UserCompanyRole;
      }> | null;
    }> | null;
  };
};

export declare const retrieveUserByEmail: import('graphql').DocumentNode;
