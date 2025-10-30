import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateContractMutationVariables = Types.Exact<{
  input: Types.CustomContractCreateInput;
}>;

export type CreateContractMutation = {
  __typename?: 'Mutation';
  createContract: { __typename?: 'CreateContractOutput'; success: boolean };
};

export const CreateContractDocument = gql`
  mutation createContract($input: CustomContractCreateInput!) {
    createContract(input: $input) {
      success
    }
  }
`;
export type CreateContractMutationFn = Apollo.MutationFunction<
  CreateContractMutation,
  CreateContractMutationVariables
>;

/**
 * __useCreateContractMutation__
 *
 * To run a mutation, you first call `useCreateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContractMutation, { data, loading, error }] = useCreateContractMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContractMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateContractMutation,
    CreateContractMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateContractMutation,
    CreateContractMutationVariables
  >(CreateContractDocument, options);
}
export type CreateContractMutationHookResult = ReturnType<
  typeof useCreateContractMutation
>;
export type CreateContractMutationResult =
  Apollo.MutationResult<CreateContractMutation>;
export type CreateContractMutationOptions = Apollo.BaseMutationOptions<
  CreateContractMutation,
  CreateContractMutationVariables
>;
