import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAssignmentReadMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Float']['input'];
}>;

export type CreateAssignmentReadMutation = {
  __typename?: 'Mutation';
  createAssignmentRead: { __typename?: 'AssignmentRead'; id: string };
};

export const CreateAssignmentReadDocument = gql`
  mutation createAssignmentRead($assignmentId: Float!) {
    createAssignmentRead(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type CreateAssignmentReadMutationFn = Apollo.MutationFunction<
  CreateAssignmentReadMutation,
  CreateAssignmentReadMutationVariables
>;

/**
 * __useCreateAssignmentReadMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentReadMutation, { data, loading, error }] = useCreateAssignmentReadMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useCreateAssignmentReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssignmentReadMutation,
    CreateAssignmentReadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAssignmentReadMutation,
    CreateAssignmentReadMutationVariables
  >(CreateAssignmentReadDocument, options);
}
export type CreateAssignmentReadMutationHookResult = ReturnType<
  typeof useCreateAssignmentReadMutation
>;
export type CreateAssignmentReadMutationResult =
  Apollo.MutationResult<CreateAssignmentReadMutation>;
export type CreateAssignmentReadMutationOptions = Apollo.BaseMutationOptions<
  CreateAssignmentReadMutation,
  CreateAssignmentReadMutationVariables
>;
