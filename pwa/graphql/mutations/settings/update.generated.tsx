import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SettingUpsertMutationVariables = Types.Exact<{
  key: Types.Scalars['String']['input'];
  value: Types.Scalars['String']['input'];
  type: Types.SettingType;
  settingId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type SettingUpsertMutation = {
  __typename?: 'Mutation';
  settingUpsert: {
    __typename?: 'Setting';
    id: string;
    key: string;
    value: string;
    type: Types.SettingType;
  };
};

export const SettingUpsertDocument = gql`
  mutation settingUpsert(
    $key: String!
    $value: String!
    $type: SettingType!
    $settingId: Int
  ) {
    settingUpsert(
      key: $key
      value: $value
      type: $type
      settingId: $settingId
    ) {
      id
      key
      value
      type
    }
  }
`;
export type SettingUpsertMutationFn = Apollo.MutationFunction<
  SettingUpsertMutation,
  SettingUpsertMutationVariables
>;

/**
 * __useSettingUpsertMutation__
 *
 * To run a mutation, you first call `useSettingUpsertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingUpsertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingUpsertMutation, { data, loading, error }] = useSettingUpsertMutation({
 *   variables: {
 *      key: // value for 'key'
 *      value: // value for 'value'
 *      type: // value for 'type'
 *      settingId: // value for 'settingId'
 *   },
 * });
 */
export function useSettingUpsertMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SettingUpsertMutation,
    SettingUpsertMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SettingUpsertMutation,
    SettingUpsertMutationVariables
  >(SettingUpsertDocument, options);
}
export type SettingUpsertMutationHookResult = ReturnType<
  typeof useSettingUpsertMutation
>;
export type SettingUpsertMutationResult =
  Apollo.MutationResult<SettingUpsertMutation>;
export type SettingUpsertMutationOptions = Apollo.BaseMutationOptions<
  SettingUpsertMutation,
  SettingUpsertMutationVariables
>;
