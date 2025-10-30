import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CloseAssignmentMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type CloseAssignmentMutation = {
  __typename?: 'Mutation';
  closeAssignment: { __typename?: 'Status'; id: string };
};

export const CloseAssignmentDocument = gql`
  mutation closeAssignment($assignmentId: Int!) {
    closeAssignment(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type CloseAssignmentMutationFn = Apollo.MutationFunction<
  CloseAssignmentMutation,
  CloseAssignmentMutationVariables
>;

/**
 * __useCloseAssignmentMutation__
 *
 * To run a mutation, you first call `useCloseAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeAssignmentMutation, { data, loading, error }] = useCloseAssignmentMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useCloseAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CloseAssignmentMutation,
    CloseAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CloseAssignmentMutation,
    CloseAssignmentMutationVariables
  >(CloseAssignmentDocument, options);
}
export type CloseAssignmentMutationHookResult = ReturnType<
  typeof useCloseAssignmentMutation
>;
export type CloseAssignmentMutationResult =
  Apollo.MutationResult<CloseAssignmentMutation>;
export type CloseAssignmentMutationOptions = Apollo.BaseMutationOptions<
  CloseAssignmentMutation,
  CloseAssignmentMutationVariables
>;
