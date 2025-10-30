import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelSubscriptionMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Float']['input'];
}>;

export type CancelSubscriptionMutation = {
  __typename?: 'Mutation';
  cancelSubscription: {
    __typename?: 'StripeSubscription';
    endDate?: number | null;
  };
};

export const CancelSubscriptionDocument = gql`
  mutation CancelSubscription($contractId: Float!) {
    cancelSubscription(contractId: $contractId) {
      endDate: current_period_end
    }
  }
`;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<
  CancelSubscriptionMutation,
  CancelSubscriptionMutationVariables
>;

/**
 * __useCancelSubscription__
 *
 * To run a mutation, you first call `useCancelSubscription` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscription` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscription, { data, loading, error }] = useCancelSubscription({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useCancelSubscription(
  baseOptions?: Apollo.MutationHookOptions<
    CancelSubscriptionMutation,
    CancelSubscriptionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CancelSubscriptionMutation,
    CancelSubscriptionMutationVariables
  >(CancelSubscriptionDocument, options);
}
export type CancelSubscriptionHookResult = ReturnType<
  typeof useCancelSubscription
>;
export type CancelSubscriptionMutationResult =
  Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  CancelSubscriptionMutation,
  CancelSubscriptionMutationVariables
>;
