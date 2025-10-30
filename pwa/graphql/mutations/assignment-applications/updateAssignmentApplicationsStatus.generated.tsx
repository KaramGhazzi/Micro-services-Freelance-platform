import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAssignmentApplicationsStatusMutationVariables = Types.Exact<{
  assignmentApplicationIds:
    | Array<Types.Scalars['Int']['input']>
    | Types.Scalars['Int']['input'];
  status: Types.AssignmentApplicationStatus;
  message?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type UpdateAssignmentApplicationsStatusMutation = {
  __typename?: 'Mutation';
  updateAssignmentApplicationsStatus: Array<{
    __typename?: 'Status';
    id: string;
  }>;
};

export const UpdateAssignmentApplicationsStatusDocument = gql`
  mutation UpdateAssignmentApplicationsStatus(
    $assignmentApplicationIds: [Int!]!
    $status: AssignmentApplicationStatus!
    $message: String
  ) {
    updateAssignmentApplicationsStatus(
      assignmentApplicationIds: $assignmentApplicationIds
      status: $status
      message: $message
    ) {
      id
    }
  }
`;
export type UpdateAssignmentApplicationsStatusMutationFn =
  Apollo.MutationFunction<
    UpdateAssignmentApplicationsStatusMutation,
    UpdateAssignmentApplicationsStatusMutationVariables
  >;

/**
 * __useUpdateAssignmentApplicationsStatusMutation__
 *
 * To run a mutation, you first call `useUpdateAssignmentApplicationsStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssignmentApplicationsStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssignmentApplicationsStatusMutation, { data, loading, error }] = useUpdateAssignmentApplicationsStatusMutation({
 *   variables: {
 *      assignmentApplicationIds: // value for 'assignmentApplicationIds'
 *      status: // value for 'status'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useUpdateAssignmentApplicationsStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAssignmentApplicationsStatusMutation,
    UpdateAssignmentApplicationsStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAssignmentApplicationsStatusMutation,
    UpdateAssignmentApplicationsStatusMutationVariables
  >(UpdateAssignmentApplicationsStatusDocument, options);
}
export type UpdateAssignmentApplicationsStatusMutationHookResult = ReturnType<
  typeof useUpdateAssignmentApplicationsStatusMutation
>;
export type UpdateAssignmentApplicationsStatusMutationResult =
  Apollo.MutationResult<UpdateAssignmentApplicationsStatusMutation>;
export type UpdateAssignmentApplicationsStatusMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateAssignmentApplicationsStatusMutation,
    UpdateAssignmentApplicationsStatusMutationVariables
  >;
