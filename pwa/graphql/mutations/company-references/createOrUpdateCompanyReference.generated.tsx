import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrUpdateCompanyReferenceMutationVariables = Types.Exact<{
  data: Types.CompanyReferenceUpdateInput;
  fileInput?: Types.InputMaybe<Types.FileInputData>;
  companyReferenceId?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;

export type CreateOrUpdateCompanyReferenceMutation = {
  __typename?: 'Mutation';
  createOrUpdateCompanyReference: {
    __typename?: 'CompanyReference';
    id: string;
    content: string;
    companyId: number;
    refereeCompanyName: string;
    refereeJob: string;
    refereeFullName: string;
    referenceImageFile?: {
      __typename?: 'File';
      blobName: string;
      container: string;
    } | null;
  };
};

export const CreateOrUpdateCompanyReferenceDocument = gql`
  mutation CreateOrUpdateCompanyReference(
    $data: CompanyReferenceUpdateInput!
    $fileInput: FileInputData
    $companyReferenceId: Float
  ) {
    createOrUpdateCompanyReference(
      data: $data
      fileInput: $fileInput
      companyReferenceId: $companyReferenceId
    ) {
      id
      content
      companyId
      refereeCompanyName
      refereeJob
      refereeFullName
      referenceImageFile {
        blobName
        container
      }
    }
  }
`;
export type CreateOrUpdateCompanyReferenceMutationFn = Apollo.MutationFunction<
  CreateOrUpdateCompanyReferenceMutation,
  CreateOrUpdateCompanyReferenceMutationVariables
>;

/**
 * __useCreateOrUpdateCompanyReferenceMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateCompanyReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateCompanyReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateCompanyReferenceMutation, { data, loading, error }] = useCreateOrUpdateCompanyReferenceMutation({
 *   variables: {
 *      data: // value for 'data'
 *      fileInput: // value for 'fileInput'
 *      companyReferenceId: // value for 'companyReferenceId'
 *   },
 * });
 */
export function useCreateOrUpdateCompanyReferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateCompanyReferenceMutation,
    CreateOrUpdateCompanyReferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOrUpdateCompanyReferenceMutation,
    CreateOrUpdateCompanyReferenceMutationVariables
  >(CreateOrUpdateCompanyReferenceDocument, options);
}
export type CreateOrUpdateCompanyReferenceMutationHookResult = ReturnType<
  typeof useCreateOrUpdateCompanyReferenceMutation
>;
export type CreateOrUpdateCompanyReferenceMutationResult =
  Apollo.MutationResult<CreateOrUpdateCompanyReferenceMutation>;
export type CreateOrUpdateCompanyReferenceMutationOptions =
  Apollo.BaseMutationOptions<
    CreateOrUpdateCompanyReferenceMutation,
    CreateOrUpdateCompanyReferenceMutationVariables
  >;
