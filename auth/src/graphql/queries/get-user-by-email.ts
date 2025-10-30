import { gql } from '@apollo/client/core';

export const getUserByEmailQuery = gql(`
  query retrieveUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      role
      email
      firstName
      lastName
      firebaseUid
      userCompanies {
        companyId
        userCompanyRoles {
          role
        }
      }
    }
  }
`);
