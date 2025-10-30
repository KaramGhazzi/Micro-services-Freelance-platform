import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserCompanyUpdateMutationVariables = Types.Exact<{
  data: Types.UpdateUsersCompaniesInput;
  where: Types.UsersCompaniesWhereUniqueInput;
}>;

export type UserCompanyUpdateMutation = {
  __typename?: 'Mutation';
  userCompanyUpdate: boolean;
};

export const UserCompanyUpdateDocument = gql`
  mutation UserCompanyUpdate(
    $data: UpdateUsersCompaniesInput!
    $where: UsersCompaniesWhereUniqueInput!
  ) {
    userCompanyUpdate(data: $data, where: $where)
  }
`;
export type UserCompanyUpdateMutationFn = Apollo.MutationFunction<
  UserCompanyUpdateMutation,
  UserCompanyUpdateMutationVariables
>;

/**
 * __useUserCompanyUpdateMutation__
 *
 * To run a mutation, you first call `useUserCompanyUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCompanyUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCompanyUpdateMutation, { data, loading, error }] = useUserCompanyUpdateMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserCompanyUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserCompanyUpdateMutation,
    UserCompanyUpdateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UserCompanyUpdateMutation,
    UserCompanyUpdateMutationVariables
  >(UserCompanyUpdateDocument, options);
}
export type UserCompanyUpdateMutationHookResult = ReturnType<
  typeof useUserCompanyUpdateMutation
>;
export type UserCompanyUpdateMutationResult =
  Apollo.MutationResult<UserCompanyUpdateMutation>;
export type UserCompanyUpdateMutationOptions = Apollo.BaseMutationOptions<
  UserCompanyUpdateMutation,
  UserCompanyUpdateMutationVariables
>;
