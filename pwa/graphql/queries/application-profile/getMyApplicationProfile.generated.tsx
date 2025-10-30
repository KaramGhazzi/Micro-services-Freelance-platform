import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyApplicationProfileQueryVariables = Types.Exact<{
  where: Types.ApplicationProfileWhereInput;
}>;

export type GetMyApplicationProfileQuery = {
  __typename?: 'Query';
  myApplicationProfile?: {
    __typename?: 'ApplicationProfile';
    id: string;
    title: string;
    rateFrom?: number | null;
    rateTo?: number | null;
    rateType?: Types.RateType | null;
    background?: string | null;
    expertises?: string | null;
    personalQualities?: string | null;
    availableFrom?: any | null;
    availability?: Types.Availability | null;
    availableHours?: number | null;
    documents?: Array<{
      __typename?: 'ApplicationProfileFile';
      id: string;
      file: {
        __typename?: 'File';
        container: string;
        blobName: string;
        name: string;
      };
    }> | null;
  } | null;
};

export const GetMyApplicationProfileDocument = gql`
  query getMyApplicationProfile($where: ApplicationProfileWhereInput!) {
    myApplicationProfile(where: $where) {
      id
      title
      rateFrom
      rateTo
      rateType
      background
      expertises
      personalQualities
      availableFrom
      availability
      availableHours
      documents {
        id
        file {
          container
          blobName
          name
        }
      }
    }
  }
`;

/**
 * __useGetMyApplicationProfileQuery__
 *
 * To run a query within a React component, call `useGetMyApplicationProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyApplicationProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyApplicationProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMyApplicationProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMyApplicationProfileQuery,
    GetMyApplicationProfileQueryVariables
  > &
    (
      | { variables: GetMyApplicationProfileQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMyApplicationProfileQuery,
    GetMyApplicationProfileQueryVariables
  >(GetMyApplicationProfileDocument, options);
}
export function useGetMyApplicationProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyApplicationProfileQuery,
    GetMyApplicationProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyApplicationProfileQuery,
    GetMyApplicationProfileQueryVariables
  >(GetMyApplicationProfileDocument, options);
}
export function useGetMyApplicationProfileSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyApplicationProfileQuery,
    GetMyApplicationProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyApplicationProfileQuery,
    GetMyApplicationProfileQueryVariables
  >(GetMyApplicationProfileDocument, options);
}
export type GetMyApplicationProfileQueryHookResult = ReturnType<
  typeof useGetMyApplicationProfileQuery
>;
export type GetMyApplicationProfileLazyQueryHookResult = ReturnType<
  typeof useGetMyApplicationProfileLazyQuery
>;
export type GetMyApplicationProfileSuspenseQueryHookResult = ReturnType<
  typeof useGetMyApplicationProfileSuspenseQuery
>;
export type GetMyApplicationProfileQueryResult = Apollo.QueryResult<
  GetMyApplicationProfileQuery,
  GetMyApplicationProfileQueryVariables
>;
