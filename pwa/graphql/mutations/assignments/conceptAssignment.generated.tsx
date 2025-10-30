import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConceptAssignmentMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
}>;

export type ConceptAssignmentMutation = {
  __typename?: 'Mutation';
  conceptAssignment: { __typename?: 'Status'; id: string };
};

export const ConceptAssignmentDocument = gql`
  mutation conceptAssignment($assignmentId: Int!) {
    conceptAssignment(assignmentId: $assignmentId) {
      id
    }
  }
`;
export type ConceptAssignmentMutationFn = Apollo.MutationFunction<
  ConceptAssignmentMutation,
  ConceptAssignmentMutationVariables
>;

/**
 * __useConceptAssignmentMutation__
 *
 * To run a mutation, you first call `useConceptAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConceptAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [conceptAssignmentMutation, { data, loading, error }] = useConceptAssignmentMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useConceptAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConceptAssignmentMutation,
    ConceptAssignmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConceptAssignmentMutation,
    ConceptAssignmentMutationVariables
  >(ConceptAssignmentDocument, options);
}
export type ConceptAssignmentMutationHookResult = ReturnType<
  typeof useConceptAssignmentMutation
>;
export type ConceptAssignmentMutationResult =
  Apollo.MutationResult<ConceptAssignmentMutation>;
export type ConceptAssignmentMutationOptions = Apollo.BaseMutationOptions<
  ConceptAssignmentMutation,
  ConceptAssignmentMutationVariables
>;
