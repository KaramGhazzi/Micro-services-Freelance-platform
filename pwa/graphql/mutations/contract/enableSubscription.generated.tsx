import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EnableSubscriptionMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Float']['input'];
}>;

export type EnableSubscriptionMutation = {
  __typename?: 'Mutation';
  enableSubscription: {
    __typename?: 'StripeSubscription';
    cancel_at_period_end?: boolean | null;
    endDate?: number | null;
  };
};

export const EnableSubscriptionDocument = gql`
  mutation EnableSubscription($contractId: Float!) {
    enableSubscription(contractId: $contractId) {
      endDate: current_period_end
      cancel_at_period_end
    }
  }
`;
export type EnableSubscriptionMutationFn = Apollo.MutationFunction<
  EnableSubscriptionMutation,
  EnableSubscriptionMutationVariables
>;

/**
 * __useEnableSubscription__
 *
 * To run a mutation, you first call `useEnableSubscription` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableSubscription` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableSubscription, { data, loading, error }] = useEnableSubscription({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useEnableSubscription(
  baseOptions?: Apollo.MutationHookOptions<
    EnableSubscriptionMutation,
    EnableSubscriptionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EnableSubscriptionMutation,
    EnableSubscriptionMutationVariables
  >(EnableSubscriptionDocument, options);
}
export type EnableSubscriptionHookResult = ReturnType<
  typeof useEnableSubscription
>;
export type EnableSubscriptionMutationResult =
  Apollo.MutationResult<EnableSubscriptionMutation>;
export type EnableSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  EnableSubscriptionMutation,
  EnableSubscriptionMutationVariables
>;
