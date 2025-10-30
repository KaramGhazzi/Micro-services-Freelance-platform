import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestAssignmentReviewMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type RequestAssignmentReviewMutation = {
  __typename?: 'Mutation';
  requestAssignmentReview: { __typename?: 'Status'; key: string };
};

export const RequestAssignmentReviewMutationDocument = gql`
  mutation requestAssignmentReviewMutation($assignmentId: Int!) {
    requestAssignmentReview(assignmentId: $assignmentId) {
      key
    }
  }
`;
export type RequestAssignmentReviewMutationMutationFn = Apollo.MutationFunction<
  RequestAssignmentReviewMutation,
  RequestAssignmentReviewMutationVariables
>;

/**
 * __useRequestAssignmentReviewMutation__
 *
 * To run a mutation, you first call `useRequestAssignmentReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestAssignmentReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestAssignmentReviewMutation, { data, loading, error }] = useRequestAssignmentReviewMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useRequestAssignmentReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestAssignmentReviewMutation,
    RequestAssignmentReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestAssignmentReviewMutation,
    RequestAssignmentReviewMutationVariables
  >(RequestAssignmentReviewMutationDocument, options);
}
export type RequestAssignmentReviewMutationHookResult = ReturnType<
  typeof useRequestAssignmentReviewMutation
>;
export type RequestAssignmentReviewMutationMutationResult =
  Apollo.MutationResult<RequestAssignmentReviewMutation>;
export type RequestAssignmentReviewMutationMutationOptions =
  Apollo.BaseMutationOptions<
    RequestAssignmentReviewMutation,
    RequestAssignmentReviewMutationVariables
  >;
