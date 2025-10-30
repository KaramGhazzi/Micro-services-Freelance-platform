import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteAssignmentApplicationMutationVariables = Types.Exact<{
  assignmentApplicationId: Types.Scalars['Int']['input'];
}>;

export type DeleteAssignmentApplicationMutation = {
  __typename?: 'Mutation';
  deleteAssignmentApplication: boolean;
};

export const DeleteAssignmentApplicationDocument = gql`
  mutation DeleteAssignmentApplication($assignmentApplicationId: Int!) {
    deleteAssignmentApplication(
      assignmentApplicationId: $assignmentApplicationId
    )
  }
`;
export type DeleteAssignmentApplicationMutationFn = Apollo.MutationFunction<
  DeleteAssignmentApplicationMutation,
  DeleteAssignmentApplicationMutationVariables
>;

/**
 * __useDeleteAssignmentApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteAssignmentApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssignmentApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssignmentApplicationMutation, { data, loading, error }] = useDeleteAssignmentApplicationMutation({
 *   variables: {
 *      assignmentApplicationId: // value for 'assignmentApplicationId'
 *   },
 * });
 */
export function useDeleteAssignmentApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAssignmentApplicationMutation,
    DeleteAssignmentApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAssignmentApplicationMutation,
    DeleteAssignmentApplicationMutationVariables
  >(DeleteAssignmentApplicationDocument, options);
}
export type DeleteAssignmentApplicationMutationHookResult = ReturnType<
  typeof useDeleteAssignmentApplicationMutation
>;
export type DeleteAssignmentApplicationMutationResult =
  Apollo.MutationResult<DeleteAssignmentApplicationMutation>;
export type DeleteAssignmentApplicationMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteAssignmentApplicationMutation,
    DeleteAssignmentApplicationMutationVariables
  >;
