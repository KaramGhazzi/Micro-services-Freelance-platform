import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFileMutationVariables = Types.Exact<{
  data: Types.FileCreateInput;
}>;

export type CreateFileMutation = {
  __typename?: 'Mutation';
  createFile: { __typename?: 'File'; uuid: string; name: string };
};

export const CreateFileDocument = gql`
  mutation createFile($data: FileCreateInput!) {
    createFile(data: $data) {
      uuid
      name
    }
  }
`;
export type CreateFileMutationFn = Apollo.MutationFunction<
  CreateFileMutation,
  CreateFileMutationVariables
>;

/**
 * __useCreateFileMutation__
 *
 * To run a mutation, you first call `useCreateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileMutation, { data, loading, error }] = useCreateFileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFileMutation,
    CreateFileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateFileMutation, CreateFileMutationVariables>(
    CreateFileDocument,
    options
  );
}
export type CreateFileMutationHookResult = ReturnType<
  typeof useCreateFileMutation
>;
export type CreateFileMutationResult =
  Apollo.MutationResult<CreateFileMutation>;
export type CreateFileMutationOptions = Apollo.BaseMutationOptions<
  CreateFileMutation,
  CreateFileMutationVariables
>;
