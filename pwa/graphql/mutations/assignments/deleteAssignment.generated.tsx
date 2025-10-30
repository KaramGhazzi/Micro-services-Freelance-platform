import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteAssignmentMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type DeleteAssignmentMutation = {
  __typename?: 'Mutation';
  deleteAssignment: string;
};

export const DeleteAssignmentDocument = gql`
  mutation deleteAssignment($assignmentId: Int!) {
    deleteAssignment(assignmentId: $assignmentId)
  }
`;
export type DeleteAssignmentMutationFn = Apollo.MutationFunction<
  DeleteAssignmentMutation,
  DeleteAssignmentMutationVariables
>;

/**
 * __useDeleteAssignmentMutation__
 *
 * To run a mutation, you first call `useDeleteAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssignmentMutation, { data, loading, error }] = useDeleteAssignmentMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useDeleteAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAssignmentMutation,
    DeleteAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAssignmentMutation,
    DeleteAssignmentMutationVariables
  >(DeleteAssignmentDocument, options);
}
export type DeleteAssignmentMutationHookResult = ReturnType<
  typeof useDeleteAssignmentMutation
>;
export type DeleteAssignmentMutationResult =
  Apollo.MutationResult<DeleteAssignmentMutation>;
export type DeleteAssignmentMutationOptions = Apollo.BaseMutationOptions<
  DeleteAssignmentMutation,
  DeleteAssignmentMutationVariables
>;
