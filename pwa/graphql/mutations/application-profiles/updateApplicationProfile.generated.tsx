import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateApplicationProfileMutationVariables = Types.Exact<{
  data: Types.ApplicationProfileUpdateInput;
  where: Types.ApplicationProfileWhereUniqueInput;
}>;

export type UpdateApplicationProfileMutation = {
  __typename?: 'Mutation';
  updateApplicationProfile: {
    __typename?: 'ApplicationProfile';
    id: string;
    uuid: string;
  };
};

export const UpdateApplicationProfileDocument = gql`
  mutation updateApplicationProfile(
    $data: ApplicationProfileUpdateInput!
    $where: ApplicationProfileWhereUniqueInput!
  ) {
    updateApplicationProfile(data: $data, where: $where) {
      id
      uuid
    }
  }
`;
export type UpdateApplicationProfileMutationFn = Apollo.MutationFunction<
  UpdateApplicationProfileMutation,
  UpdateApplicationProfileMutationVariables
>;

/**
 * __useUpdateApplicationProfileMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationProfileMutation, { data, loading, error }] = useUpdateApplicationProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateApplicationProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateApplicationProfileMutation,
    UpdateApplicationProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateApplicationProfileMutation,
    UpdateApplicationProfileMutationVariables
  >(UpdateApplicationProfileDocument, options);
}
export type UpdateApplicationProfileMutationHookResult = ReturnType<
  typeof useUpdateApplicationProfileMutation
>;
export type UpdateApplicationProfileMutationResult =
  Apollo.MutationResult<UpdateApplicationProfileMutation>;
export type UpdateApplicationProfileMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateApplicationProfileMutation,
    UpdateApplicationProfileMutationVariables
  >;
