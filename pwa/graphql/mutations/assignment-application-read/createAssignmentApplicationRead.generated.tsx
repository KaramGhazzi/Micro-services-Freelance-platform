import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAssignmentApplicationReadMutationVariables = Types.Exact<{
  assignmentApplicationId: Types.Scalars['Float']['input'];
}>;

export type CreateAssignmentApplicationReadMutation = {
  __typename?: 'Mutation';
  createAssignmentApplicationRead: {
    __typename?: 'AssignmentApplicationRead';
    id: string;
  };
};

export const CreateAssignmentApplicationReadDocument = gql`
  mutation createAssignmentApplicationRead($assignmentApplicationId: Float!) {
    createAssignmentApplicationRead(
      assignmentApplicationId: $assignmentApplicationId
    ) {
      id
    }
  }
`;
export type CreateAssignmentApplicationReadMutationFn = Apollo.MutationFunction<
  CreateAssignmentApplicationReadMutation,
  CreateAssignmentApplicationReadMutationVariables
>;

/**
 * __useCreateAssignmentApplicationReadMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentApplicationReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentApplicationReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentApplicationReadMutation, { data, loading, error }] = useCreateAssignmentApplicationReadMutation({
 *   variables: {
 *      assignmentApplicationId: // value for 'assignmentApplicationId'
 *   },
 * });
 */
export function useCreateAssignmentApplicationReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssignmentApplicationReadMutation,
    CreateAssignmentApplicationReadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAssignmentApplicationReadMutation,
    CreateAssignmentApplicationReadMutationVariables
  >(CreateAssignmentApplicationReadDocument, options);
}
export type CreateAssignmentApplicationReadMutationHookResult = ReturnType<
  typeof useCreateAssignmentApplicationReadMutation
>;
export type CreateAssignmentApplicationReadMutationResult =
  Apollo.MutationResult<CreateAssignmentApplicationReadMutation>;
export type CreateAssignmentApplicationReadMutationOptions =
  Apollo.BaseMutationOptions<
    CreateAssignmentApplicationReadMutation,
    CreateAssignmentApplicationReadMutationVariables
  >;
