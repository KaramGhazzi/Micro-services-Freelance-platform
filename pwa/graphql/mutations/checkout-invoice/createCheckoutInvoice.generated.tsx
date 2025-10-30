import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckoutInvoiceCreateMutationVariables = Types.Exact<{
  checkoutInvoiceCreateInput: Types.CheckoutInvoiceCreateInput;
}>;

export type CheckoutInvoiceCreateMutation = {
  __typename?: 'Mutation';
  checkoutInvoiceCreate: {
    __typename?: 'CheckoutInvoice';
    isSuccessful: boolean;
    token: string;
  };
};

export const CheckoutInvoiceCreateDocument = gql`
  mutation checkoutInvoiceCreate(
    $checkoutInvoiceCreateInput: CheckoutInvoiceCreateInput!
  ) {
    checkoutInvoiceCreate(
      checkoutInvoiceCreateInput: $checkoutInvoiceCreateInput
    ) {
      isSuccessful
      token
    }
  }
`;
export type CheckoutInvoiceCreateMutationFn = Apollo.MutationFunction<
  CheckoutInvoiceCreateMutation,
  CheckoutInvoiceCreateMutationVariables
>;

/**
 * __useCheckoutInvoiceCreateMutation__
 *
 * To run a mutation, you first call `useCheckoutInvoiceCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutInvoiceCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutInvoiceCreateMutation, { data, loading, error }] = useCheckoutInvoiceCreateMutation({
 *   variables: {
 *      checkoutInvoiceCreateInput: // value for 'checkoutInvoiceCreateInput'
 *   },
 * });
 */
export function useCheckoutInvoiceCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CheckoutInvoiceCreateMutation,
    CheckoutInvoiceCreateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CheckoutInvoiceCreateMutation,
    CheckoutInvoiceCreateMutationVariables
  >(CheckoutInvoiceCreateDocument, options);
}
export type CheckoutInvoiceCreateMutationHookResult = ReturnType<
  typeof useCheckoutInvoiceCreateMutation
>;
export type CheckoutInvoiceCreateMutationResult =
  Apollo.MutationResult<CheckoutInvoiceCreateMutation>;
export type CheckoutInvoiceCreateMutationOptions = Apollo.BaseMutationOptions<
  CheckoutInvoiceCreateMutation,
  CheckoutInvoiceCreateMutationVariables
>;
