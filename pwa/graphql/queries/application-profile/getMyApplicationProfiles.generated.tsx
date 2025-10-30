import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyApplicationProfilesQueryVariables = Types.Exact<{
  orderBy?: Types.InputMaybe<
    | Array<Types.ApplicationProfileOrderByWithRelationInput>
    | Types.ApplicationProfileOrderByWithRelationInput
  >;
}>;

export type GetMyApplicationProfilesQuery = {
  __typename?: 'Query';
  myApplicationProfiles?: Array<{
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
  }> | null;
};

export const GetMyApplicationProfilesDocument = gql`
  query getMyApplicationProfiles(
    $orderBy: [ApplicationProfileOrderByWithRelationInput!]
  ) {
    myApplicationProfiles(orderBy: $orderBy) {
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
 * __useGetMyApplicationProfilesQuery__
 *
 * To run a query within a React component, call `useGetMyApplicationProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyApplicationProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyApplicationProfilesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetMyApplicationProfilesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyApplicationProfilesQuery,
    GetMyApplicationProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMyApplicationProfilesQuery,
    GetMyApplicationProfilesQueryVariables
  >(GetMyApplicationProfilesDocument, options);
}
export function useGetMyApplicationProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyApplicationProfilesQuery,
    GetMyApplicationProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyApplicationProfilesQuery,
    GetMyApplicationProfilesQueryVariables
  >(GetMyApplicationProfilesDocument, options);
}
export function useGetMyApplicationProfilesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyApplicationProfilesQuery,
    GetMyApplicationProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetMyApplicationProfilesQuery,
    GetMyApplicationProfilesQueryVariables
  >(GetMyApplicationProfilesDocument, options);
}
export type GetMyApplicationProfilesQueryHookResult = ReturnType<
  typeof useGetMyApplicationProfilesQuery
>;
export type GetMyApplicationProfilesLazyQueryHookResult = ReturnType<
  typeof useGetMyApplicationProfilesLazyQuery
>;
export type GetMyApplicationProfilesSuspenseQueryHookResult = ReturnType<
  typeof useGetMyApplicationProfilesSuspenseQuery
>;
export type GetMyApplicationProfilesQueryResult = Apollo.QueryResult<
  GetMyApplicationProfilesQuery,
  GetMyApplicationProfilesQueryVariables
>;
