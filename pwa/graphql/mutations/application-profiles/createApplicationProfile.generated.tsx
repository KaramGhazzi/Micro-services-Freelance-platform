import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateApplicationProfileMutationVariables = Types.Exact<{
  data: Types.ApplicationProfileCreateInput;
}>;

export type CreateApplicationProfileMutation = {
  __typename?: 'Mutation';
  createApplicationProfile: {
    __typename?: 'ApplicationProfile';
    id: string;
    uuid: string;
  };
};

export const CreateApplicationProfileDocument = gql`
  mutation createApplicationProfile($data: ApplicationProfileCreateInput!) {
    createApplicationProfile(data: $data) {
      id
      uuid
    }
  }
`;
export type CreateApplicationProfileMutationFn = Apollo.MutationFunction<
  CreateApplicationProfileMutation,
  CreateApplicationProfileMutationVariables
>;

/**
 * __useCreateApplicationProfileMutation__
 *
 * To run a mutation, you first call `useCreateApplicationProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationProfileMutation, { data, loading, error }] = useCreateApplicationProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateApplicationProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateApplicationProfileMutation,
    CreateApplicationProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateApplicationProfileMutation,
    CreateApplicationProfileMutationVariables
  >(CreateApplicationProfileDocument, options);
}
export type CreateApplicationProfileMutationHookResult = ReturnType<
  typeof useCreateApplicationProfileMutation
>;
export type CreateApplicationProfileMutationResult =
  Apollo.MutationResult<CreateApplicationProfileMutation>;
export type CreateApplicationProfileMutationOptions =
  Apollo.BaseMutationOptions<
    CreateApplicationProfileMutation,
    CreateApplicationProfileMutationVariables
  >;
