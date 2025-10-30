import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDraftAssignmentApplicationMutationVariables = Types.Exact<{
  data: Types.AssignmentApplicationUpdateInput;
  assignmentId: Types.Scalars['Int']['input'];
  assignmentApplicationId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CreateDraftAssignmentApplicationMutation = {
  __typename?: 'Mutation';
  createDraftAssignmentApplication: {
    __typename?: 'AssignmentApplication';
    id: string;
    uuid: string;
  };
};

export const CreateDraftAssignmentApplicationDocument = gql`
  mutation createDraftAssignmentApplication(
    $data: AssignmentApplicationUpdateInput!
    $assignmentId: Int!
    $assignmentApplicationId: Int
  ) {
    createDraftAssignmentApplication(
      data: $data
      assignmentId: $assignmentId
      assignmentApplicationId: $assignmentApplicationId
    ) {
      id
      uuid
    }
  }
`;
export type CreateDraftAssignmentApplicationMutationFn =
  Apollo.MutationFunction<
    CreateDraftAssignmentApplicationMutation,
    CreateDraftAssignmentApplicationMutationVariables
  >;

/**
 * __useCreateDraftAssignmentApplicationMutation__
 *
 * To run a mutation, you first call `useCreateDraftAssignmentApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftAssignmentApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftAssignmentApplicationMutation, { data, loading, error }] = useCreateDraftAssignmentApplicationMutation({
 *   variables: {
 *      data: // value for 'data'
 *      assignmentId: // value for 'assignmentId'
 *      assignmentApplicationId: // value for 'assignmentApplicationId'
 *   },
 * });
 */
export function useCreateDraftAssignmentApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDraftAssignmentApplicationMutation,
    CreateDraftAssignmentApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDraftAssignmentApplicationMutation,
    CreateDraftAssignmentApplicationMutationVariables
  >(CreateDraftAssignmentApplicationDocument, options);
}
export type CreateDraftAssignmentApplicationMutationHookResult = ReturnType<
  typeof useCreateDraftAssignmentApplicationMutation
>;
export type CreateDraftAssignmentApplicationMutationResult =
  Apollo.MutationResult<CreateDraftAssignmentApplicationMutation>;
export type CreateDraftAssignmentApplicationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateDraftAssignmentApplicationMutation,
    CreateDraftAssignmentApplicationMutationVariables
  >;
