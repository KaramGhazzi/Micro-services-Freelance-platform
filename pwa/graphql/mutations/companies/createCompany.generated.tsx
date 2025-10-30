import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompanyCreateMutationVariables = Types.Exact<{
  data: Types.CompanyCreateInput;
}>;

export type CompanyCreateMutation = {
  __typename?: 'Mutation';
  companyCreate: { __typename?: 'Company'; id: string };
};

export const CompanyCreateDocument = gql`
  mutation CompanyCreate($data: CompanyCreateInput!) {
    companyCreate(data: $data) {
      id
    }
  }
`;
export type CompanyCreateMutationFn = Apollo.MutationFunction<
  CompanyCreateMutation,
  CompanyCreateMutationVariables
>;

/**
 * __useCompanyCreateMutation__
 *
 * To run a mutation, you first call `useCompanyCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyCreateMutation, { data, loading, error }] = useCompanyCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCompanyCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CompanyCreateMutation,
    CompanyCreateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CompanyCreateMutation,
    CompanyCreateMutationVariables
  >(CompanyCreateDocument, options);
}
export type CompanyCreateMutationHookResult = ReturnType<
  typeof useCompanyCreateMutation
>;
export type CompanyCreateMutationResult =
  Apollo.MutationResult<CompanyCreateMutation>;
export type CompanyCreateMutationOptions = Apollo.BaseMutationOptions<
  CompanyCreateMutation,
  CompanyCreateMutationVariables
>;
