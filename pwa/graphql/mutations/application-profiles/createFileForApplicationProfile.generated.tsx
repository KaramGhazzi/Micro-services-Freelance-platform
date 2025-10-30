import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFileForApplicationProfileMutationVariables = Types.Exact<{
  data: Types.FileInputData;
  applicationProfileUUID: Types.Scalars['String']['input'];
}>;

export type CreateFileForApplicationProfileMutation = {
  __typename?: 'Mutation';
  createFileForApplicationProfile: { __typename?: 'File'; name: string };
};

export const CreateFileForApplicationProfileDocument = gql`
  mutation CreateFileForApplicationProfile(
    $data: FileInputData!
    $applicationProfileUUID: String!
  ) {
    createFileForApplicationProfile(
      data: $data
      applicationProfileUUID: $applicationProfileUUID
    ) {
      name
    }
  }
`;
export type CreateFileForApplicationProfileMutationFn = Apollo.MutationFunction<
  CreateFileForApplicationProfileMutation,
  CreateFileForApplicationProfileMutationVariables
>;

/**
 * __useCreateFileForApplicationProfileMutation__
 *
 * To run a mutation, you first call `useCreateFileForApplicationProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileForApplicationProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileForApplicationProfileMutation, { data, loading, error }] = useCreateFileForApplicationProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *      applicationProfileUUID: // value for 'applicationProfileUUID'
 *   },
 * });
 */
export function useCreateFileForApplicationProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFileForApplicationProfileMutation,
    CreateFileForApplicationProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateFileForApplicationProfileMutation,
    CreateFileForApplicationProfileMutationVariables
  >(CreateFileForApplicationProfileDocument, options);
}
export type CreateFileForApplicationProfileMutationHookResult = ReturnType<
  typeof useCreateFileForApplicationProfileMutation
>;
export type CreateFileForApplicationProfileMutationResult =
  Apollo.MutationResult<CreateFileForApplicationProfileMutation>;
export type CreateFileForApplicationProfileMutationOptions =
  Apollo.BaseMutationOptions<
    CreateFileForApplicationProfileMutation,
    CreateFileForApplicationProfileMutationVariables
  >;
