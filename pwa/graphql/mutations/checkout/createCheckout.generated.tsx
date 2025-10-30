import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckoutCreateMutationVariables = Types.Exact<{
  data: Types.CheckoutCreateInput;
}>;

export type CheckoutCreateMutation = {
  __typename?: 'Mutation';
  checkoutCreate: {
    __typename?: 'Checkout';
    sessionId: string;
    session: { __typename?: 'StripeSession'; url?: string | null };
  };
};

export const CheckoutCreateDocument = gql`
  mutation CheckoutCreate($data: CheckoutCreateInput!) {
    checkoutCreate(data: $data) {
      sessionId
      session {
        url
      }
    }
  }
`;
export type CheckoutCreateMutationFn = Apollo.MutationFunction<
  CheckoutCreateMutation,
  CheckoutCreateMutationVariables
>;

/**
 * __useCheckoutCreateMutation__
 *
 * To run a mutation, you first call `useCheckoutCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutCreateMutation, { data, loading, error }] = useCheckoutCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCheckoutCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CheckoutCreateMutation,
    CheckoutCreateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CheckoutCreateMutation,
    CheckoutCreateMutationVariables
  >(CheckoutCreateDocument, options);
}
export type CheckoutCreateMutationHookResult = ReturnType<
  typeof useCheckoutCreateMutation
>;
export type CheckoutCreateMutationResult =
  Apollo.MutationResult<CheckoutCreateMutation>;
export type CheckoutCreateMutationOptions = Apollo.BaseMutationOptions<
  CheckoutCreateMutation,
  CheckoutCreateMutationVariables
>;
