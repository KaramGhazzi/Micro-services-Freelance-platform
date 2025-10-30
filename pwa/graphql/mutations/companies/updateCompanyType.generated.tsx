import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyTypeMutationVariables = Types.Exact<{
  companyId: Types.Scalars['Float']['input'];
  type: Types.CompanyType;
}>;

export type UpdateCompanyTypeMutation = {
  __typename?: 'Mutation';
  companyTypeUpdate: string;
};

export const UpdateCompanyTypeDocument = gql`
  mutation UpdateCompanyType($companyId: Float!, $type: CompanyType!) {
    companyTypeUpdate(companyId: $companyId, type: $type)
  }
`;
export type UpdateCompanyTypeMutationFn = Apollo.MutationFunction<
  UpdateCompanyTypeMutation,
  UpdateCompanyTypeMutationVariables
>;

/**
 * __useUpdateCompanyTypeMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyTypeMutation, { data, loading, error }] = useUpdateCompanyTypeMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdateCompanyTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCompanyTypeMutation,
    UpdateCompanyTypeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCompanyTypeMutation,
    UpdateCompanyTypeMutationVariables
  >(UpdateCompanyTypeDocument, options);
}
export type UpdateCompanyTypeMutationHookResult = ReturnType<
  typeof useUpdateCompanyTypeMutation
>;
export type UpdateCompanyTypeMutationResult =
  Apollo.MutationResult<UpdateCompanyTypeMutation>;
export type UpdateCompanyTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateCompanyTypeMutation,
  UpdateCompanyTypeMutationVariables
>;
