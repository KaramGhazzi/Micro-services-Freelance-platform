import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserUpdateMutationVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  data: Types.UserUpdateInput;
}>;

export type UserUpdateMutation = {
  __typename?: 'Mutation';
  userUpdate: {
    __typename?: 'User';
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    dateOfBirth?: any | null;
    phoneNumber?: string | null;
    linkedInUrl?: string | null;
    userCompanies?: Array<{
      __typename?: 'UsersCompanies';
      userId: number;
      companyId: number;
    }> | null;
    settings?: Array<{
      __typename?: 'Setting';
      id: string;
      key: string;
      type: Types.SettingType;
      value: string;
    }> | null;
  };
};

export const UserUpdateDocument = gql`
  mutation userUpdate($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    userUpdate(where: $where, data: $data) {
      id
      firstName
      lastName
      email
      dateOfBirth
      phoneNumber
      linkedInUrl
      userCompanies {
        userId
        companyId
      }
      settings {
        id
        key
        type
        value
      }
    }
  }
`;
export type UserUpdateMutationFn = Apollo.MutationFunction<
  UserUpdateMutation,
  UserUpdateMutationVariables
>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserUpdateMutation,
    UserUpdateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(
    UserUpdateDocument,
    options
  );
}
export type UserUpdateMutationHookResult = ReturnType<
  typeof useUserUpdateMutation
>;
export type UserUpdateMutationResult =
  Apollo.MutationResult<UserUpdateMutation>;
export type UserUpdateMutationOptions = Apollo.BaseMutationOptions<
  UserUpdateMutation,
  UserUpdateMutationVariables
>;
