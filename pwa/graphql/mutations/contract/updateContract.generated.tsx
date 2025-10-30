import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateContractMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Float']['input'];
  companyId: Types.Scalars['Float']['input'];
  input: Types.ContractUpdateInput;
}>;

export type UpdateContractMutation = {
  __typename?: 'Mutation';
  updateContract: { __typename?: 'UpdateContractOutput'; isSuccess: boolean };
};

export const UpdateContractDocument = gql`
  mutation updateContract(
    $contractId: Float!
    $companyId: Float!
    $input: ContractUpdateInput!
  ) {
    updateContract(
      contractId: $contractId
      companyId: $companyId
      input: $input
    ) {
      isSuccess
    }
  }
`;
export type UpdateContractMutationFn = Apollo.MutationFunction<
  UpdateContractMutation,
  UpdateContractMutationVariables
>;

/**
 * __useUpdateContractMutation__
 *
 * To run a mutation, you first call `useUpdateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractMutation, { data, loading, error }] = useUpdateContractMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      companyId: // value for 'companyId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContractMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContractMutation,
    UpdateContractMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContractMutation,
    UpdateContractMutationVariables
  >(UpdateContractDocument, options);
}
export type UpdateContractMutationHookResult = ReturnType<
  typeof useUpdateContractMutation
>;
export type UpdateContractMutationResult =
  Apollo.MutationResult<UpdateContractMutation>;
export type UpdateContractMutationOptions = Apollo.BaseMutationOptions<
  UpdateContractMutation,
  UpdateContractMutationVariables
>;
