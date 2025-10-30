import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReassignAssignmentMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
  ownerId: Types.Scalars['Int']['input'];
}>;

export type ReassignAssignmentMutation = {
  __typename?: 'Mutation';
  reassignAssignment: { __typename?: 'Assignment'; ownerId: number };
};

export const ReassignAssignmentDocument = gql`
  mutation reassignAssignment($assignmentId: Int!, $ownerId: Int!) {
    reassignAssignment(assignmentId: $assignmentId, ownerId: $ownerId) {
      ownerId
    }
  }
`;
export type ReassignAssignmentMutationFn = Apollo.MutationFunction<
  ReassignAssignmentMutation,
  ReassignAssignmentMutationVariables
>;

/**
 * __useReassignAssignmentMutation__
 *
 * To run a mutation, you first call `useReassignAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReassignAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reassignAssignmentMutation, { data, loading, error }] = useReassignAssignmentMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useReassignAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReassignAssignmentMutation,
    ReassignAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReassignAssignmentMutation,
    ReassignAssignmentMutationVariables
  >(ReassignAssignmentDocument, options);
}
export type ReassignAssignmentMutationHookResult = ReturnType<
  typeof useReassignAssignmentMutation
>;
export type ReassignAssignmentMutationResult =
  Apollo.MutationResult<ReassignAssignmentMutation>;
export type ReassignAssignmentMutationOptions = Apollo.BaseMutationOptions<
  ReassignAssignmentMutation,
  ReassignAssignmentMutationVariables
>;
