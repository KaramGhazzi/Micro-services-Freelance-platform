import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetApplicationProfilesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ApplicationProfileWhereInput>;
  orderBy?: Types.InputMaybe<
    | Array<Types.ApplicationProfileOrderByWithRelationInput>
    | Types.ApplicationProfileOrderByWithRelationInput
  >;
}>;

export type GetApplicationProfilesQuery = {
  __typename?: 'Query';
  applicationProfiles?: Array<{
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

export const GetApplicationProfilesDocument = gql`
  query getApplicationProfiles(
    $where: ApplicationProfileWhereInput
    $orderBy: [ApplicationProfileOrderByWithRelationInput!]
  ) {
    applicationProfiles(where: $where, orderBy: $orderBy) {
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
 * __useGetApplicationProfilesQuery__
 *
 * To run a query within a React component, call `useGetApplicationProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationProfilesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetApplicationProfilesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetApplicationProfilesQuery,
    GetApplicationProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetApplicationProfilesQuery,
    GetApplicationProfilesQueryVariables
  >(GetApplicationProfilesDocument, options);
}
export function useGetApplicationProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApplicationProfilesQuery,
    GetApplicationProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetApplicationProfilesQuery,
    GetApplicationProfilesQueryVariables
  >(GetApplicationProfilesDocument, options);
}
export function useGetApplicationProfilesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetApplicationProfilesQuery,
    GetApplicationProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetApplicationProfilesQuery,
    GetApplicationProfilesQueryVariables
  >(GetApplicationProfilesDocument, options);
}
export type GetApplicationProfilesQueryHookResult = ReturnType<
  typeof useGetApplicationProfilesQuery
>;
export type GetApplicationProfilesLazyQueryHookResult = ReturnType<
  typeof useGetApplicationProfilesLazyQuery
>;
export type GetApplicationProfilesSuspenseQueryHookResult = ReturnType<
  typeof useGetApplicationProfilesSuspenseQuery
>;
export type GetApplicationProfilesQueryResult = Apollo.QueryResult<
  GetApplicationProfilesQuery,
  GetApplicationProfilesQueryVariables
>;
