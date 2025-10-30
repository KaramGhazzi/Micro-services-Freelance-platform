import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateQuestionAssignmentApplicationMutationVariables = Types.Exact<{
  assignmentId: Types.Scalars['Int']['input'];
  questionText: Types.Scalars['String']['input'];
}>;

export type CreateQuestionAssignmentApplicationMutation = {
  __typename?: 'Mutation';
  createQuestionAssignmentApplication: {
    __typename?: 'AssignmentApplication';
    id: string;
    owner: {
      __typename?: 'User';
      externalId: string;
      firstName?: string | null;
      id: string;
      lastName?: string | null;
      firebaseUid?: string | null;
    };
    assignment: {
      __typename?: 'Assignment';
      status?: Types.AssignmentStatus | null;
      title?: string | null;
      owner: {
        __typename?: 'User';
        firstName?: string | null;
        id: string;
        lastName?: string | null;
        firebaseUid?: string | null;
        profilePhoto?: {
          __typename?: 'File';
          container: string;
          blobName: string;
        } | null;
      };
      company: { __typename?: 'Company'; name?: string | null };
      currentStatus: { __typename?: 'Status'; key: string };
    };
  };
};

export const CreateQuestionAssignmentApplicationDocument = gql`
  mutation CreateQuestionAssignmentApplication(
    $assignmentId: Int!
    $questionText: String!
  ) {
    createQuestionAssignmentApplication(
      assignmentId: $assignmentId
      questionText: $questionText
    ) {
      id
      owner {
        externalId
        firstName
        id
        lastName
        firebaseUid
      }
      assignment {
        status
        owner {
          firstName
          id
          lastName
          firebaseUid
          profilePhoto {
            container
            blobName
          }
        }
        company {
          name
        }
        currentStatus {
          key
        }
        title
      }
    }
  }
`;
export type CreateQuestionAssignmentApplicationMutationFn =
  Apollo.MutationFunction<
    CreateQuestionAssignmentApplicationMutation,
    CreateQuestionAssignmentApplicationMutationVariables
  >;

/**
 * __useCreateQuestionAssignmentApplicationMutation__
 *
 * To run a mutation, you first call `useCreateQuestionAssignmentApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionAssignmentApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionAssignmentApplicationMutation, { data, loading, error }] = useCreateQuestionAssignmentApplicationMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *      questionText: // value for 'questionText'
 *   },
 * });
 */
export function useCreateQuestionAssignmentApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateQuestionAssignmentApplicationMutation,
    CreateQuestionAssignmentApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateQuestionAssignmentApplicationMutation,
    CreateQuestionAssignmentApplicationMutationVariables
  >(CreateQuestionAssignmentApplicationDocument, options);
}
export type CreateQuestionAssignmentApplicationMutationHookResult = ReturnType<
  typeof useCreateQuestionAssignmentApplicationMutation
>;
export type CreateQuestionAssignmentApplicationMutationResult =
  Apollo.MutationResult<CreateQuestionAssignmentApplicationMutation>;
export type CreateQuestionAssignmentApplicationMutationOptions =
  Apollo.BaseMutationOptions<
    CreateQuestionAssignmentApplicationMutation,
    CreateQuestionAssignmentApplicationMutationVariables
  >;
