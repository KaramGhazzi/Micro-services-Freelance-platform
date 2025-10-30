import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDraftAssignmentMutationVariables = Types.Exact<{
  data: Types.AssignmentUpdateInput;
  assignmentId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CreateDraftAssignmentMutation = {
  __typename?: 'Mutation';
  createDraftAssignment: { __typename?: 'Assignment'; id: string };
};

export const CreateDraftAssignmentDocument = gql`
  mutation createDraftAssignment(
    $data: AssignmentUpdateInput!
    $assignmentId: Int
  ) {
    createDraftAssignment(data: $data, assignmentId: $assignmentId) {
      id
    }
  }
`;
export type CreateDraftAssignmentMutationFn = Apollo.MutationFunction<
  CreateDraftAssignmentMutation,
  CreateDraftAssignmentMutationVariables
>;

/**
 * __useCreateDraftAssignmentMutation__
 *
 * To run a mutation, you first call `useCreateDraftAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftAssignmentMutation, { data, loading, error }] = useCreateDraftAssignmentMutation({
 *   variables: {
 *      data: // value for 'data'
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useCreateDraftAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDraftAssignmentMutation,
    CreateDraftAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDraftAssignmentMutation,
    CreateDraftAssignmentMutationVariables
  >(CreateDraftAssignmentDocument, options);
}
export type CreateDraftAssignmentMutationHookResult = ReturnType<
  typeof useCreateDraftAssignmentMutation
>;
export type CreateDraftAssignmentMutationResult =
  Apollo.MutationResult<CreateDraftAssignmentMutation>;
export type CreateDraftAssignmentMutationOptions = Apollo.BaseMutationOptions<
  CreateDraftAssignmentMutation,
  CreateDraftAssignmentMutationVariables
>;
