import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddFavoriteMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type AddFavoriteMutation = {
  __typename?: 'Mutation';
  addFavorite: { __typename?: 'UserFavorite'; id: string };
};

export const AddFavoriteDocument = gql`
  mutation AddFavorite($assignmentId: Int!) {
    addFavorite(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type AddFavoriteMutationFn = Apollo.MutationFunction<
  AddFavoriteMutation,
  AddFavoriteMutationVariables
>;

/**
 * __useAddFavoriteMutation__
 *
 * To run a mutation, you first call `useAddFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavoriteMutation, { data, loading, error }] = useAddFavoriteMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useAddFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddFavoriteMutation,
    AddFavoriteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddFavoriteMutation, AddFavoriteMutationVariables>(
    AddFavoriteDocument,
    options
  );
}
export type AddFavoriteMutationHookResult = ReturnType<
  typeof useAddFavoriteMutation
>;
export type AddFavoriteMutationResult =
  Apollo.MutationResult<AddFavoriteMutation>;
export type AddFavoriteMutationOptions = Apollo.BaseMutationOptions<
  AddFavoriteMutation,
  AddFavoriteMutationVariables
>;
