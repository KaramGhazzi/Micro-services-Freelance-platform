import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSavedSearchMutationVariables = Types.Exact<{
  data: Types.SavedSearchCreateInput;
}>;

export type CreateSavedSearchMutation = {
  __typename?: 'Mutation';
  createSavedSearch: { __typename?: 'SavedSearch'; id: string };
};

export const CreateSavedSearchDocument = gql`
  mutation CreateSavedSearch($data: SavedSearchCreateInput!) {
    createSavedSearch(data: $data) {
      id
    }
  }
`;
export type CreateSavedSearchMutationFn = Apollo.MutationFunction<
  CreateSavedSearchMutation,
  CreateSavedSearchMutationVariables
>;

/**
 * __useCreateSavedSearchMutation__
 *
 * To run a mutation, you first call `useCreateSavedSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSavedSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSavedSearchMutation, { data, loading, error }] = useCreateSavedSearchMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSavedSearchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSavedSearchMutation,
    CreateSavedSearchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSavedSearchMutation,
    CreateSavedSearchMutationVariables
  >(CreateSavedSearchDocument, options);
}
export type CreateSavedSearchMutationHookResult = ReturnType<
  typeof useCreateSavedSearchMutation
>;
export type CreateSavedSearchMutationResult =
  Apollo.MutationResult<CreateSavedSearchMutation>;
export type CreateSavedSearchMutationOptions = Apollo.BaseMutationOptions<
  CreateSavedSearchMutation,
  CreateSavedSearchMutationVariables
>;
