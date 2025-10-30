import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAssignmentApplicationMutationVariables = Types.Exact<{
  data: Types.AssignmentApplicationUpdateInput;
  assignmentId: Types.Scalars['Int']['input'];
  assignmentApplicationId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CreateAssignmentApplicationMutation = {
  __typename?: 'Mutation';
  createAssignmentApplication: {
    __typename?: 'AssignmentApplication';
    id: string;
    uuid: string;
  };
};

export const CreateAssignmentApplicationDocument = gql`
  mutation CreateAssignmentApplication(
    $data: AssignmentApplicationUpdateInput!
    $assignmentId: Int!
    $assignmentApplicationId: Int
  ) {
    createAssignmentApplication(
      data: $data
      assignmentId: $assignmentId
      assignmentApplicationId: $assignmentApplicationId
    ) {
      id
      uuid
    }
  }
`;
export type CreateAssignmentApplicationMutationFn = Apollo.MutationFunction<
  CreateAssignmentApplicationMutation,
  CreateAssignmentApplicationMutationVariables
>;

/**
 * __useCreateAssignmentApplicationMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentApplicationMutation, { data, loading, error }] = useCreateAssignmentApplicationMutation({
 *   variables: {
 *      data: // value for 'data'
 *      assignmentId: // value for 'assignmentId'
 *      assignmentApplicationId: // value for 'assignmentApplicationId'
 *   },
 * });
 */
export function useCreateAssignmentApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssignmentApplicationMutation,
    CreateAssignmentApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAssignmentApplicationMutation,
    CreateAssignmentApplicationMutationVariables
  >(CreateAssignmentApplicationDocument, options);
}
export type CreateAssignmentApplicationMutationHookResult = ReturnType<
  typeof useCreateAssignmentApplicationMutation
>;
export type CreateAssignmentApplicationMutationResult =
  Apollo.MutationResult<CreateAssignmentApplicationMutation>;
export type CreateAssignmentApplicationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateAssignmentApplicationMutation,
    CreateAssignmentApplicationMutationVariables
  >;
