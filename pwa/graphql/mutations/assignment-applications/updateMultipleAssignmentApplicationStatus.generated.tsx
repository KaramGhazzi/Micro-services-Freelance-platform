import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateMultipleAssignmentApplicationStatusMutationVariables =
  Types.Exact<{
    assignmentApplicationIds:
      | Array<Types.Scalars['Int']['input']>
      | Types.Scalars['Int']['input'];
    status: Types.AssignmentApplicationStatus;
    message: Types.Scalars['String']['input'];
  }>;

export type UpdateMultipleAssignmentApplicationStatusMutation = {
  __typename?: 'Mutation';
  updateMultipleAssignmentApplicationStatus: Array<{
    __typename?: 'Status';
    id: string;
  }>;
};

export const UpdateMultipleAssignmentApplicationStatusDocument = gql`
  mutation UpdateMultipleAssignmentApplicationStatus(
    $assignmentApplicationIds: [Int!]!
    $status: AssignmentApplicationStatus!
    $message: String!
  ) {
    updateMultipleAssignmentApplicationStatus(
      assignmentApplicationIds: $assignmentApplicationIds
      status: $status
      message: $message
    ) {
      id
    }
  }
`;
export type UpdateMultipleAssignmentApplicationStatusMutationFn =
  Apollo.MutationFunction<
    UpdateMultipleAssignmentApplicationStatusMutation,
    UpdateMultipleAssignmentApplicationStatusMutationVariables
  >;

/**
 * __useUpdateMultipleAssignmentApplicationStatusMutation__
 *
 * To run a mutation, you first call `useUpdateMultipleAssignmentApplicationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMultipleAssignmentApplicationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMultipleAssignmentApplicationStatusMutation, { data, loading, error }] = useUpdateMultipleAssignmentApplicationStatusMutation({
 *   variables: {
 *      assignmentApplicationIds: // value for 'assignmentApplicationIds'
 *      status: // value for 'status'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useUpdateMultipleAssignmentApplicationStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMultipleAssignmentApplicationStatusMutation,
    UpdateMultipleAssignmentApplicationStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMultipleAssignmentApplicationStatusMutation,
    UpdateMultipleAssignmentApplicationStatusMutationVariables
  >(UpdateMultipleAssignmentApplicationStatusDocument, options);
}
export type UpdateMultipleAssignmentApplicationStatusMutationHookResult =
  ReturnType<typeof useUpdateMultipleAssignmentApplicationStatusMutation>;
export type UpdateMultipleAssignmentApplicationStatusMutationResult =
  Apollo.MutationResult<UpdateMultipleAssignmentApplicationStatusMutation>;
export type UpdateMultipleAssignmentApplicationStatusMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateMultipleAssignmentApplicationStatusMutation,
    UpdateMultipleAssignmentApplicationStatusMutationVariables
  >;
