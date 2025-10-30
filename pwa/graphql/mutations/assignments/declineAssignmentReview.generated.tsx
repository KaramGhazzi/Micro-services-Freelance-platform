import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeclineAssignmentReviewMutationVariables = Types.Exact<{
  data: Types.DeclineAssignment;
}>;

export type DeclineAssignmentReviewMutation = {
  __typename?: 'Mutation';
  reviewDeclined: { __typename?: 'Status'; key: string };
};

export const DeclineAssignmentReviewMutationDocument = gql`
  mutation declineAssignmentReviewMutation($data: DeclineAssignment!) {
    reviewDeclined(data: $data) {
      key
    }
  }
`;
export type DeclineAssignmentReviewMutationMutationFn = Apollo.MutationFunction<
  DeclineAssignmentReviewMutation,
  DeclineAssignmentReviewMutationVariables
>;

/**
 * __useDeclineAssignmentReviewMutation__
 *
 * To run a mutation, you first call `useDeclineAssignmentReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineAssignmentReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineAssignmentReviewMutation, { data, loading, error }] = useDeclineAssignmentReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeclineAssignmentReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeclineAssignmentReviewMutation,
    DeclineAssignmentReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeclineAssignmentReviewMutation,
    DeclineAssignmentReviewMutationVariables
  >(DeclineAssignmentReviewMutationDocument, options);
}
export type DeclineAssignmentReviewMutationHookResult = ReturnType<
  typeof useDeclineAssignmentReviewMutation
>;
export type DeclineAssignmentReviewMutationMutationResult =
  Apollo.MutationResult<DeclineAssignmentReviewMutation>;
export type DeclineAssignmentReviewMutationMutationOptions =
  Apollo.BaseMutationOptions<
    DeclineAssignmentReviewMutation,
    DeclineAssignmentReviewMutationVariables
  >;
