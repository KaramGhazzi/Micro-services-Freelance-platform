import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteCompanyImageMutationVariables = Types.Exact<{
  imageType: Types.CompanyImageType;
}>;

export type DeleteCompanyImageMutation = {
  __typename?: 'Mutation';
  deleteCompanyImage: boolean;
};

export const DeleteCompanyImageDocument = gql`
  mutation DeleteCompanyImage($imageType: CompanyImageType!) {
    deleteCompanyImage(imageType: $imageType)
  }
`;
export type DeleteCompanyImageMutationFn = Apollo.MutationFunction<
  DeleteCompanyImageMutation,
  DeleteCompanyImageMutationVariables
>;

/**
 * __useDeleteCompanyImageMutation__
 *
 * To run a mutation, you first call `useDeleteCompanyImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompanyImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompanyImageMutation, { data, loading, error }] = useDeleteCompanyImageMutation({
 *   variables: {
 *      imageType: // value for 'imageType'
 *   },
 * });
 */
export function useDeleteCompanyImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCompanyImageMutation,
    DeleteCompanyImageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCompanyImageMutation,
    DeleteCompanyImageMutationVariables
  >(DeleteCompanyImageDocument, options);
}
export type DeleteCompanyImageMutationHookResult = ReturnType<
  typeof useDeleteCompanyImageMutation
>;
export type DeleteCompanyImageMutationResult =
  Apollo.MutationResult<DeleteCompanyImageMutation>;
export type DeleteCompanyImageMutationOptions = Apollo.BaseMutationOptions<
  DeleteCompanyImageMutation,
  DeleteCompanyImageMutationVariables
>;
