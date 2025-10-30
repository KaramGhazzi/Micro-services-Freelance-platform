import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FileDownloadLinkQueryVariables = Types.Exact<{
  containerName: Types.Scalars['String']['input'];
  blobName: Types.Scalars['String']['input'];
}>;

export type FileDownloadLinkQuery = {
  __typename?: 'Query';
  fileDownloadLink: { __typename?: 'DownloadLink'; url: string };
};

export const FileDownloadLinkDocument = gql`
  query FileDownloadLink($containerName: String!, $blobName: String!) {
    fileDownloadLink(containerName: $containerName, blobName: $blobName) {
      url
    }
  }
`;

/**
 * __useFileDownloadLinkQuery__
 *
 * To run a query within a React component, call `useFileDownloadLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileDownloadLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileDownloadLinkQuery({
 *   variables: {
 *      containerName: // value for 'containerName'
 *      blobName: // value for 'blobName'
 *   },
 * });
 */
export function useFileDownloadLinkQuery(
  baseOptions: Apollo.QueryHookOptions<
    FileDownloadLinkQuery,
    FileDownloadLinkQueryVariables
  > &
    (
      | { variables: FileDownloadLinkQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FileDownloadLinkQuery, FileDownloadLinkQueryVariables>(
    FileDownloadLinkDocument,
    options
  );
}
export function useFileDownloadLinkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FileDownloadLinkQuery,
    FileDownloadLinkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FileDownloadLinkQuery,
    FileDownloadLinkQueryVariables
  >(FileDownloadLinkDocument, options);
}
export function useFileDownloadLinkSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    FileDownloadLinkQuery,
    FileDownloadLinkQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    FileDownloadLinkQuery,
    FileDownloadLinkQueryVariables
  >(FileDownloadLinkDocument, options);
}
export type FileDownloadLinkQueryHookResult = ReturnType<
  typeof useFileDownloadLinkQuery
>;
export type FileDownloadLinkLazyQueryHookResult = ReturnType<
  typeof useFileDownloadLinkLazyQuery
>;
export type FileDownloadLinkSuspenseQueryHookResult = ReturnType<
  typeof useFileDownloadLinkSuspenseQuery
>;
export type FileDownloadLinkQueryResult = Apollo.QueryResult<
  FileDownloadLinkQuery,
  FileDownloadLinkQueryVariables
>;
