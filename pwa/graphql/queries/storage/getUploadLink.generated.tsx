import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFileUploadLinkQueryVariables = Types.Exact<{
  blobName: Types.Scalars['String']['input'];
  containerName: Types.Scalars['String']['input'];
}>;

export type GetFileUploadLinkQuery = {
  __typename?: 'Query';
  fileUploadLink: {
    __typename?: 'UploadLink';
    blobName: string;
    url: string;
    expiresOn?: any | null;
  };
};

export const GetFileUploadLinkDocument = gql`
  query getFileUploadLink($blobName: String!, $containerName: String!) {
    fileUploadLink(blobName: $blobName, containerName: $containerName) {
      blobName
      url
      expiresOn
    }
  }
`;

/**
 * __useGetFileUploadLinkQuery__
 *
 * To run a query within a React component, call `useGetFileUploadLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileUploadLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileUploadLinkQuery({
 *   variables: {
 *      blobName: // value for 'blobName'
 *      containerName: // value for 'containerName'
 *   },
 * });
 */
export function useGetFileUploadLinkQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFileUploadLinkQuery,
    GetFileUploadLinkQueryVariables
  > &
    (
      | { variables: GetFileUploadLinkQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFileUploadLinkQuery,
    GetFileUploadLinkQueryVariables
  >(GetFileUploadLinkDocument, options);
}
export function useGetFileUploadLinkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFileUploadLinkQuery,
    GetFileUploadLinkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFileUploadLinkQuery,
    GetFileUploadLinkQueryVariables
  >(GetFileUploadLinkDocument, options);
}
export function useGetFileUploadLinkSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetFileUploadLinkQuery,
    GetFileUploadLinkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetFileUploadLinkQuery,
    GetFileUploadLinkQueryVariables
  >(GetFileUploadLinkDocument, options);
}
export type GetFileUploadLinkQueryHookResult = ReturnType<
  typeof useGetFileUploadLinkQuery
>;
export type GetFileUploadLinkLazyQueryHookResult = ReturnType<
  typeof useGetFileUploadLinkLazyQuery
>;
export type GetFileUploadLinkSuspenseQueryHookResult = ReturnType<
  typeof useGetFileUploadLinkSuspenseQuery
>;
export type GetFileUploadLinkQueryResult = Apollo.QueryResult<
  GetFileUploadLinkQuery,
  GetFileUploadLinkQueryVariables
>;
