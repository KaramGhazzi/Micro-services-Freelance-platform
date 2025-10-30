import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetApplicationProfileQueryVariables = Types.Exact<{
  where: Types.ApplicationProfileWhereInput;
}>;

export type GetApplicationProfileQuery = {
  __typename?: 'Query';
  applicationProfile?: {
    __typename?: 'ApplicationProfile';
    id: string;
    title: string;
    rateFrom?: number | null;
    rateTo?: number | null;
    rateType?: Types.RateType | null;
    availableHours?: number | null;
    availability?: Types.Availability | null;
    expertises?: string | null;
    background?: string | null;
    personalQualities?: string | null;
    documents?: Array<{
      __typename?: 'ApplicationProfileFile';
      id: string;
      file: {
        __typename?: 'File';
        name: string;
        uuid: string;
        container: string;
        blobName: string;
        size?: number | null;
      };
    }> | null;
  } | null;
};

export const GetApplicationProfileDocument = gql`
  query getApplicationProfile($where: ApplicationProfileWhereInput!) {
    applicationProfile(where: $where) {
      id
      title
      rateFrom
      rateTo
      rateType
      availableHours
      availability
      expertises
      background
      personalQualities
      documents {
        id
        file {
          name
          uuid
          container
          blobName
          size
        }
      }
    }
  }
`;

/**
 * __useGetApplicationProfileQuery__
 *
 * To run a query within a React component, call `useGetApplicationProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetApplicationProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetApplicationProfileQuery,
    GetApplicationProfileQueryVariables
  > &
    (
      | { variables: GetApplicationProfileQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetApplicationProfileQuery,
    GetApplicationProfileQueryVariables
  >(GetApplicationProfileDocument, options);
}
export function useGetApplicationProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApplicationProfileQuery,
    GetApplicationProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetApplicationProfileQuery,
    GetApplicationProfileQueryVariables
  >(GetApplicationProfileDocument, options);
}
export function useGetApplicationProfileSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetApplicationProfileQuery,
    GetApplicationProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetApplicationProfileQuery,
    GetApplicationProfileQueryVariables
  >(GetApplicationProfileDocument, options);
}
export type GetApplicationProfileQueryHookResult = ReturnType<
  typeof useGetApplicationProfileQuery
>;
export type GetApplicationProfileLazyQueryHookResult = ReturnType<
  typeof useGetApplicationProfileLazyQuery
>;
export type GetApplicationProfileSuspenseQueryHookResult = ReturnType<
  typeof useGetApplicationProfileSuspenseQuery
>;
export type GetApplicationProfileQueryResult = Apollo.QueryResult<
  GetApplicationProfileQuery,
  GetApplicationProfileQueryVariables
>;
