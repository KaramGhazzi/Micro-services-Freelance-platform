import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PauseAssignmentMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type PauseAssignmentMutation = {
  __typename?: 'Mutation';
  pauseAssignment: { __typename?: 'Status'; id: string };
};

export const PauseAssignmentDocument = gql`
  mutation pauseAssignment($assignmentId: Int!) {
    pauseAssignment(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type PauseAssignmentMutationFn = Apollo.MutationFunction<
  PauseAssignmentMutation,
  PauseAssignmentMutationVariables
>;

/**
 * __usePauseAssignmentMutation__
 *
 * To run a mutation, you first call `usePauseAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseAssignmentMutation, { data, loading, error }] = usePauseAssignmentMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function usePauseAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PauseAssignmentMutation,
    PauseAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PauseAssignmentMutation,
    PauseAssignmentMutationVariables
  >(PauseAssignmentDocument, options);
}
export type PauseAssignmentMutationHookResult = ReturnType<
  typeof usePauseAssignmentMutation
>;
export type PauseAssignmentMutationResult =
  Apollo.MutationResult<PauseAssignmentMutation>;
export type PauseAssignmentMutationOptions = Apollo.BaseMutationOptions<
  PauseAssignmentMutation,
  PauseAssignmentMutationVariables
>;
