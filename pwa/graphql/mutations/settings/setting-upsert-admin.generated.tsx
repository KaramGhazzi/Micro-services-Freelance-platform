import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SettingUpsertAdminMutationVariables = Types.Exact<{
  key: Types.Scalars['String']['input'];
  value: Types.Scalars['String']['input'];
  type: Types.SettingType;
  userId: Types.Scalars['Int']['input'];
  settingId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type SettingUpsertAdminMutation = {
  __typename?: 'Mutation';
  settingUpsert: {
    __typename?: 'Setting';
    id: string;
    key: string;
    value: string;
    type: Types.SettingType;
  };
};

export const SettingUpsertAdminDocument = gql`
  mutation settingUpsertAdmin(
    $key: String!
    $value: String!
    $type: SettingType!
    $userId: Int!
    $settingId: Int
  ) {
    settingUpsert: settingUpsertAdmin(
      key: $key
      value: $value
      type: $type
      userId: $userId
      settingId: $settingId
    ) {
      id
      key
      value
      type
    }
  }
`;
export type SettingUpsertAdminMutationFn = Apollo.MutationFunction<
  SettingUpsertAdminMutation,
  SettingUpsertAdminMutationVariables
>;

/**
 * __useSettingUpsertAdminMutation__
 *
 * To run a mutation, you first call `useSettingUpsertAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingUpsertAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingUpsertAdminMutation, { data, loading, error }] = useSettingUpsertAdminMutation({
 *   variables: {
 *      key: // value for 'key'
 *      value: // value for 'value'
 *      type: // value for 'type'
 *      userId: // value for 'userId'
 *      settingId: // value for 'settingId'
 *   },
 * });
 */
export function useSettingUpsertAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SettingUpsertAdminMutation,
    SettingUpsertAdminMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SettingUpsertAdminMutation,
    SettingUpsertAdminMutationVariables
  >(SettingUpsertAdminDocument, options);
}
export type SettingUpsertAdminMutationHookResult = ReturnType<
  typeof useSettingUpsertAdminMutation
>;
export type SettingUpsertAdminMutationResult =
  Apollo.MutationResult<SettingUpsertAdminMutation>;
export type SettingUpsertAdminMutationOptions = Apollo.BaseMutationOptions<
  SettingUpsertAdminMutation,
  SettingUpsertAdminMutationVariables
>;
