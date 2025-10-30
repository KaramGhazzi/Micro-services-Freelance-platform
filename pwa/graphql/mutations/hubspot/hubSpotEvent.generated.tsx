import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HubSpotEventMutationVariables = Types.Exact<{
  eventName: Types.Scalars['String']['input'];
  utk: Types.Scalars['String']['input'];
}>;

export type HubSpotEventMutation = {
  __typename?: 'Mutation';
  hubSpotEvent: boolean;
};

export const HubSpotEventDocument = gql`
  mutation HubSpotEvent($eventName: String!, $utk: String!) {
    hubSpotEvent(eventName: $eventName, utk: $utk)
  }
`;
export type HubSpotEventMutationFn = Apollo.MutationFunction<
  HubSpotEventMutation,
  HubSpotEventMutationVariables
>;

/**
 * __useHubSpotEventMutation__
 *
 * To run a mutation, you first call `useHubSpotEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHubSpotEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hubSpotEventMutation, { data, loading, error }] = useHubSpotEventMutation({
 *   variables: {
 *      eventName: // value for 'eventName'
 *      utk: // value for 'utk'
 *   },
 * });
 */
export function useHubSpotEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    HubSpotEventMutation,
    HubSpotEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    HubSpotEventMutation,
    HubSpotEventMutationVariables
  >(HubSpotEventDocument, options);
}
export type HubSpotEventMutationHookResult = ReturnType<
  typeof useHubSpotEventMutation
>;
export type HubSpotEventMutationResult =
  Apollo.MutationResult<HubSpotEventMutation>;
export type HubSpotEventMutationOptions = Apollo.BaseMutationOptions<
  HubSpotEventMutation,
  HubSpotEventMutationVariables
>;
