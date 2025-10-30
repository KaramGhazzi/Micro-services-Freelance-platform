import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFileForAssignmentApplicationMutationVariables = Types.Exact<{
  data: Types.FileInputData;
  assignmentApplicationUUID: Types.Scalars['String']['input'];
}>;

export type CreateFileForAssignmentApplicationMutation = {
  __typename?: 'Mutation';
  createFileForAssignmentApplication: { __typename?: 'File'; name: string };
};

export const CreateFileForAssignmentApplicationDocument = gql`
  mutation CreateFileForAssignmentApplication(
    $data: FileInputData!
    $assignmentApplicationUUID: String!
  ) {
    createFileForAssignmentApplication(
      data: $data
      assignmentApplicationUUID: $assignmentApplicationUUID
    ) {
      name
    }
  }
`;
export type CreateFileForAssignmentApplicationMutationFn =
  Apollo.MutationFunction<
    CreateFileForAssignmentApplicationMutation,
    CreateFileForAssignmentApplicationMutationVariables
  >;

/**
 * __useCreateFileForAssignmentApplicationMutation__
 *
 * To run a mutation, you first call `useCreateFileForAssignmentApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileForAssignmentApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileForAssignmentApplicationMutation, { data, loading, error }] = useCreateFileForAssignmentApplicationMutation({
 *   variables: {
 *      data: // value for 'data'
 *      assignmentApplicationUUID: // value for 'assignmentApplicationUUID'
 *   },
 * });
 */
export function useCreateFileForAssignmentApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFileForAssignmentApplicationMutation,
    CreateFileForAssignmentApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateFileForAssignmentApplicationMutation,
    CreateFileForAssignmentApplicationMutationVariables
  >(CreateFileForAssignmentApplicationDocument, options);
}
export type CreateFileForAssignmentApplicationMutationHookResult = ReturnType<
  typeof useCreateFileForAssignmentApplicationMutation
>;
export type CreateFileForAssignmentApplicationMutationResult =
  Apollo.MutationResult<CreateFileForAssignmentApplicationMutation>;
export type CreateFileForAssignmentApplicationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateFileForAssignmentApplicationMutation,
    CreateFileForAssignmentApplicationMutationVariables
  >;
