import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteApplicationProfileMutationVariables = Types.Exact<{
  applicationProfileId: Types.Scalars['Int']['input'];
}>;

export type DeleteApplicationProfileMutation = {
  __typename?: 'Mutation';
  deleteApplicationProfile: boolean;
};

export const DeleteApplicationProfileDocument = gql`
  mutation DeleteApplicationProfile($applicationProfileId: Int!) {
    deleteApplicationProfile(applicationProfileId: $applicationProfileId)
  }
`;
export type DeleteApplicationProfileMutationFn = Apollo.MutationFunction<
  DeleteApplicationProfileMutation,
  DeleteApplicationProfileMutationVariables
>;

/**
 * __useDeleteApplicationProfileMutation__
 *
 * To run a mutation, you first call `useDeleteApplicationProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApplicationProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApplicationProfileMutation, { data, loading, error }] = useDeleteApplicationProfileMutation({
 *   variables: {
 *      applicationProfileId: // value for 'applicationProfileId'
 *   },
 * });
 */
export function useDeleteApplicationProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteApplicationProfileMutation,
    DeleteApplicationProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteApplicationProfileMutation,
    DeleteApplicationProfileMutationVariables
  >(DeleteApplicationProfileDocument, options);
}
export type DeleteApplicationProfileMutationHookResult = ReturnType<
  typeof useDeleteApplicationProfileMutation
>;
export type DeleteApplicationProfileMutationResult =
  Apollo.MutationResult<DeleteApplicationProfileMutation>;
export type DeleteApplicationProfileMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteApplicationProfileMutation,
    DeleteApplicationProfileMutationVariables
  >;
