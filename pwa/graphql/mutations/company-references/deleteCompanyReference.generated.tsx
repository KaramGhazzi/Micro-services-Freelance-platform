import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteCompanyReferenceMutationVariables = Types.Exact<{
  companyReferenceId: Types.Scalars['Float']['input'];
}>;

export type DeleteCompanyReferenceMutation = {
  __typename?: 'Mutation';
  deleteCompanyReference: { __typename?: 'CompanyReference'; id: string };
};

export const DeleteCompanyReferenceDocument = gql`
  mutation DeleteCompanyReference($companyReferenceId: Float!) {
    deleteCompanyReference(companyReferenceId: $companyReferenceId) {
      id
    }
  }
`;
export type DeleteCompanyReferenceMutationFn = Apollo.MutationFunction<
  DeleteCompanyReferenceMutation,
  DeleteCompanyReferenceMutationVariables
>;

/**
 * __useDeleteCompanyReferenceMutation__
 *
 * To run a mutation, you first call `useDeleteCompanyReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompanyReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompanyReferenceMutation, { data, loading, error }] = useDeleteCompanyReferenceMutation({
 *   variables: {
 *      companyReferenceId: // value for 'companyReferenceId'
 *   },
 * });
 */
export function useDeleteCompanyReferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCompanyReferenceMutation,
    DeleteCompanyReferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCompanyReferenceMutation,
    DeleteCompanyReferenceMutationVariables
  >(DeleteCompanyReferenceDocument, options);
}
export type DeleteCompanyReferenceMutationHookResult = ReturnType<
  typeof useDeleteCompanyReferenceMutation
>;
export type DeleteCompanyReferenceMutationResult =
  Apollo.MutationResult<DeleteCompanyReferenceMutation>;
export type DeleteCompanyReferenceMutationOptions = Apollo.BaseMutationOptions<
  DeleteCompanyReferenceMutation,
  DeleteCompanyReferenceMutationVariables
>;
