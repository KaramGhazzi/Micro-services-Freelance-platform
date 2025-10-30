import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReviewAssignmentMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type ReviewAssignmentMutation = {
  __typename?: 'Mutation';
  reviewAssignment: { __typename?: 'Status'; id: string };
};

export const ReviewAssignmentDocument = gql`
  mutation reviewAssignment($assignmentId: Int!) {
    reviewAssignment(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type ReviewAssignmentMutationFn = Apollo.MutationFunction<
  ReviewAssignmentMutation,
  ReviewAssignmentMutationVariables
>;

/**
 * __useReviewAssignmentMutation__
 *
 * To run a mutation, you first call `useReviewAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewAssignmentMutation, { data, loading, error }] = useReviewAssignmentMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useReviewAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReviewAssignmentMutation,
    ReviewAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReviewAssignmentMutation,
    ReviewAssignmentMutationVariables
  >(ReviewAssignmentDocument, options);
}
export type ReviewAssignmentMutationHookResult = ReturnType<
  typeof useReviewAssignmentMutation
>;
export type ReviewAssignmentMutationResult =
  Apollo.MutationResult<ReviewAssignmentMutation>;
export type ReviewAssignmentMutationOptions = Apollo.BaseMutationOptions<
  ReviewAssignmentMutation,
  ReviewAssignmentMutationVariables
>;
