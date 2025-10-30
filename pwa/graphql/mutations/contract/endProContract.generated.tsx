import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EndProContractMutationVariables = Types.Exact<{
  proEndDate: Types.Scalars['String']['input'];
  basicCompanyStartDate: Types.Scalars['String']['input'];
  companyId: Types.Scalars['Float']['input'];
}>;

export type EndProContractMutation = {
  __typename?: 'Mutation';
  endProContract: {
    __typename?: 'EndProContractOutput';
    isSuccessful: boolean;
  };
};

export const EndProContractDocument = gql`
  mutation endProContract(
    $proEndDate: String!
    $basicCompanyStartDate: String!
    $companyId: Float!
  ) {
    endProContract(
      proEndDate: $proEndDate
      basicCompanyStartDate: $basicCompanyStartDate
      companyId: $companyId
    ) {
      isSuccessful
    }
  }
`;
export type EndProContractMutationFn = Apollo.MutationFunction<
  EndProContractMutation,
  EndProContractMutationVariables
>;

/**
 * __useEndProContractMutation__
 *
 * To run a mutation, you first call `useEndProContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndProContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endProContractMutation, { data, loading, error }] = useEndProContractMutation({
 *   variables: {
 *      proEndDate: // value for 'proEndDate'
 *      basicCompanyStartDate: // value for 'basicCompanyStartDate'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useEndProContractMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EndProContractMutation,
    EndProContractMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EndProContractMutation,
    EndProContractMutationVariables
  >(EndProContractDocument, options);
}
export type EndProContractMutationHookResult = ReturnType<
  typeof useEndProContractMutation
>;
export type EndProContractMutationResult =
  Apollo.MutationResult<EndProContractMutation>;
export type EndProContractMutationOptions = Apollo.BaseMutationOptions<
  EndProContractMutation,
  EndProContractMutationVariables
>;
