import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyMutationVariables = Types.Exact<{
  data: Types.CompanyUpdateInput;
  where: Types.CompanyWhereUniqueInput;
}>;

export type UpdateCompanyMutation = {
  __typename?: 'Mutation';
  companyUpdate: {
    __typename?: 'Company';
    id: string;
    name?: string | null;
    about?: string | null;
    youtubeUrl?: string | null;
    showCurrentAssignments: boolean;
    showEmployees: boolean;
    cocNumber?: string | null;
    type: Types.CompanyType;
  };
};

export const UpdateCompanyDocument = gql`
  mutation UpdateCompany(
    $data: CompanyUpdateInput!
    $where: CompanyWhereUniqueInput!
  ) {
    companyUpdate(data: $data, where: $where) {
      id
      name
      about
      youtubeUrl
      showCurrentAssignments
      showEmployees
      cocNumber
      type
    }
  }
`;
export type UpdateCompanyMutationFn = Apollo.MutationFunction<
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables
>;

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables
  >(UpdateCompanyDocument, options);
}
export type UpdateCompanyMutationHookResult = ReturnType<
  typeof useUpdateCompanyMutation
>;
export type UpdateCompanyMutationResult =
  Apollo.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = Apollo.BaseMutationOptions<
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables
>;
