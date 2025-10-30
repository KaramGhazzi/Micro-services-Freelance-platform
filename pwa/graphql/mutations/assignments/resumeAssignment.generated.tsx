import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResumeAssignmentMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type ResumeAssignmentMutation = {
  __typename?: 'Mutation';
  resumeAssignment: { __typename?: 'Status'; id: string };
};

export const ResumeAssignmentDocument = gql`
  mutation resumeAssignment($assignmentId: Int!) {
    resumeAssignment(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type ResumeAssignmentMutationFn = Apollo.MutationFunction<
  ResumeAssignmentMutation,
  ResumeAssignmentMutationVariables
>;

/**
 * __useResumeAssignmentMutation__
 *
 * To run a mutation, you first call `useResumeAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResumeAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resumeAssignmentMutation, { data, loading, error }] = useResumeAssignmentMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useResumeAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResumeAssignmentMutation,
    ResumeAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResumeAssignmentMutation,
    ResumeAssignmentMutationVariables
  >(ResumeAssignmentDocument, options);
}
export type ResumeAssignmentMutationHookResult = ReturnType<
  typeof useResumeAssignmentMutation
>;
export type ResumeAssignmentMutationResult =
  Apollo.MutationResult<ResumeAssignmentMutation>;
export type ResumeAssignmentMutationOptions = Apollo.BaseMutationOptions<
  ResumeAssignmentMutation,
  ResumeAssignmentMutationVariables
>;
