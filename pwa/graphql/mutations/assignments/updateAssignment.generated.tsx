import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAssignmentAdminMutationVariables = Types.Exact<{
  data: Types.AssignmentUpdateInput;
  assignmentId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type UpdateAssignmentAdminMutation = {
  __typename?: 'Mutation';
  updateAssignmentAdmin: {
    __typename?: 'Assignment';
    id: string;
    expertises?: Array<{
      __typename?: 'AssignmentExpertise';
      id: string;
      expertise: Types.ExpertiseType;
    }> | null;
  };
};

export const UpdateAssignmentAdminDocument = gql`
  mutation updateAssignmentAdmin(
    $data: AssignmentUpdateInput!
    $assignmentId: Int
  ) {
    updateAssignmentAdmin(data: $data, assignmentId: $assignmentId) {
      id
      expertises {
        id
        expertise
      }
    }
  }
`;
export type UpdateAssignmentAdminMutationFn = Apollo.MutationFunction<
  UpdateAssignmentAdminMutation,
  UpdateAssignmentAdminMutationVariables
>;

/**
 * __useUpdateAssignmentAdminMutation__
 *
 * To run a mutation, you first call `useUpdateAssignmentAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssignmentAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssignmentAdminMutation, { data, loading, error }] = useUpdateAssignmentAdminMutation({
 *   variables: {
 *      data: // value for 'data'
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useUpdateAssignmentAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAssignmentAdminMutation,
    UpdateAssignmentAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAssignmentAdminMutation,
    UpdateAssignmentAdminMutationVariables
  >(UpdateAssignmentAdminDocument, options);
}
export type UpdateAssignmentAdminMutationHookResult = ReturnType<
  typeof useUpdateAssignmentAdminMutation
>;
export type UpdateAssignmentAdminMutationResult =
  Apollo.MutationResult<UpdateAssignmentAdminMutation>;
export type UpdateAssignmentAdminMutationOptions = Apollo.BaseMutationOptions<
  UpdateAssignmentAdminMutation,
  UpdateAssignmentAdminMutationVariables
>;
