import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAssignmentMutationVariables = Types.Exact<{
  data: Types.AssignmentUpdateInput;
  assignmentId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CreateAssignmentMutation = {
  __typename?: 'Mutation';
  createAssignment: { __typename?: 'Assignment'; id: string };
};

export const CreateAssignmentDocument = gql`
  mutation createAssignment($data: AssignmentUpdateInput!, $assignmentId: Int) {
    createAssignment(data: $data, assignmentId: $assignmentId) {
      id
    }
  }
`;
export type CreateAssignmentMutationFn = Apollo.MutationFunction<
  CreateAssignmentMutation,
  CreateAssignmentMutationVariables
>;

/**
 * __useCreateAssignmentMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentMutation, { data, loading, error }] = useCreateAssignmentMutation({
 *   variables: {
 *      data: // value for 'data'
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useCreateAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssignmentMutation,
    CreateAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAssignmentMutation,
    CreateAssignmentMutationVariables
  >(CreateAssignmentDocument, options);
}
export type CreateAssignmentMutationHookResult = ReturnType<
  typeof useCreateAssignmentMutation
>;
export type CreateAssignmentMutationResult =
  Apollo.MutationResult<CreateAssignmentMutation>;
export type CreateAssignmentMutationOptions = Apollo.BaseMutationOptions<
  CreateAssignmentMutation,
  CreateAssignmentMutationVariables
>;
