import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserCompanyDeleteMutationVariables = Types.Exact<{
  where: Types.UsersCompaniesWhereUniqueInput;
  currentOwner: Types.Scalars['Float']['input'];
  newOwner: Types.Scalars['Float']['input'];
}>;

export type UserCompanyDeleteMutation = {
  __typename?: 'Mutation';
  userCompanyDelete: boolean;
};

export const UserCompanyDeleteDocument = gql`
  mutation UserCompanyDelete(
    $where: UsersCompaniesWhereUniqueInput!
    $currentOwner: Float!
    $newOwner: Float!
  ) {
    userCompanyDelete(
      where: $where
      currentOwner: $currentOwner
      newOwner: $newOwner
    )
  }
`;
export type UserCompanyDeleteMutationFn = Apollo.MutationFunction<
  UserCompanyDeleteMutation,
  UserCompanyDeleteMutationVariables
>;

/**
 * __useUserCompanyDeleteMutation__
 *
 * To run a mutation, you first call `useUserCompanyDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCompanyDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCompanyDeleteMutation, { data, loading, error }] = useUserCompanyDeleteMutation({
 *   variables: {
 *      where: // value for 'where'
 *      currentOwner: // value for 'currentOwner'
 *      newOwner: // value for 'newOwner'
 *   },
 * });
 */
export function useUserCompanyDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserCompanyDeleteMutation,
    UserCompanyDeleteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UserCompanyDeleteMutation,
    UserCompanyDeleteMutationVariables
  >(UserCompanyDeleteDocument, options);
}
export type UserCompanyDeleteMutationHookResult = ReturnType<
  typeof useUserCompanyDeleteMutation
>;
export type UserCompanyDeleteMutationResult =
  Apollo.MutationResult<UserCompanyDeleteMutation>;
export type UserCompanyDeleteMutationOptions = Apollo.BaseMutationOptions<
  UserCompanyDeleteMutation,
  UserCompanyDeleteMutationVariables
>;
