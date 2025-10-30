import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyImageMutationVariables = Types.Exact<{
  data: Types.FileInputData;
  imageType: Types.CompanyImageType;
}>;

export type UpdateCompanyImageMutation = {
  __typename?: 'Mutation';
  updateCompanyImage: { __typename?: 'Company'; id: string };
};

export const UpdateCompanyImageDocument = gql`
  mutation UpdateCompanyImage(
    $data: FileInputData!
    $imageType: CompanyImageType!
  ) {
    updateCompanyImage(data: $data, imageType: $imageType) {
      id
    }
  }
`;
export type UpdateCompanyImageMutationFn = Apollo.MutationFunction<
  UpdateCompanyImageMutation,
  UpdateCompanyImageMutationVariables
>;

/**
 * __useUpdateCompanyImageMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyImageMutation, { data, loading, error }] = useUpdateCompanyImageMutation({
 *   variables: {
 *      data: // value for 'data'
 *      imageType: // value for 'imageType'
 *   },
 * });
 */
export function useUpdateCompanyImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCompanyImageMutation,
    UpdateCompanyImageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCompanyImageMutation,
    UpdateCompanyImageMutationVariables
  >(UpdateCompanyImageDocument, options);
}
export type UpdateCompanyImageMutationHookResult = ReturnType<
  typeof useUpdateCompanyImageMutation
>;
export type UpdateCompanyImageMutationResult =
  Apollo.MutationResult<UpdateCompanyImageMutation>;
export type UpdateCompanyImageMutationOptions = Apollo.BaseMutationOptions<
  UpdateCompanyImageMutation,
  UpdateCompanyImageMutationVariables
>;
