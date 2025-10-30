import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveAssignmentReviewMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type ApproveAssignmentReviewMutation = {
  __typename?: 'Mutation';
  reviewApproved: { __typename?: 'Status'; key: string };
};

export const ApproveAssignmentReviewMutationDocument = gql`
  mutation approveAssignmentReviewMutation($assignmentId: Int!) {
    reviewApproved(assignmentId: $assignmentId) {
      key
    }
  }
`;
export type ApproveAssignmentReviewMutationMutationFn = Apollo.MutationFunction<
  ApproveAssignmentReviewMutation,
  ApproveAssignmentReviewMutationVariables
>;

/**
 * __useApproveAssignmentReviewMutation__
 *
 * To run a mutation, you first call `useApproveAssignmentReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveAssignmentReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveAssignmentReviewMutation, { data, loading, error }] = useApproveAssignmentReviewMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useApproveAssignmentReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveAssignmentReviewMutation,
    ApproveAssignmentReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ApproveAssignmentReviewMutation,
    ApproveAssignmentReviewMutationVariables
  >(ApproveAssignmentReviewMutationDocument, options);
}
export type ApproveAssignmentReviewMutationHookResult = ReturnType<
  typeof useApproveAssignmentReviewMutation
>;
export type ApproveAssignmentReviewMutationMutationResult =
  Apollo.MutationResult<ApproveAssignmentReviewMutation>;
export type ApproveAssignmentReviewMutationMutationOptions =
  Apollo.BaseMutationOptions<
    ApproveAssignmentReviewMutation,
    ApproveAssignmentReviewMutationVariables
  >;
