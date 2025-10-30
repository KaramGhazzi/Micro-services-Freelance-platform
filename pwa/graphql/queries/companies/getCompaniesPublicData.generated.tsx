import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompaniesPublicdataQueryVariables = Types.Exact<{
  where: Types.CompanyWhereInput;
  orderBy?: Types.InputMaybe<
    | Array<Types.CompanyOrderByWithRelationInput>
    | Types.CompanyOrderByWithRelationInput
  >;
}>;

export type CompaniesPublicdataQuery = {
  __typename?: 'Query';
  companiesPublicData: Array<{
    __typename?: 'PublicCompany';
    id: string;
    name?: string | null;
    coverImageFile?: {
      __typename?: 'File';
      container: string;
      blobName: string;
      name: string;
    } | null;
    logoImageFile?: {
      __typename?: 'File';
      container: string;
      blobName: string;
      name: string;
    } | null;
  }>;
};

export const CompaniesPublicdataDocument = gql`
  query companiesPublicdata(
    $where: CompanyWhereInput!
    $orderBy: [CompanyOrderByWithRelationInput!]
  ) {
    companiesPublicData(where: $where, orderBy: $orderBy) {
      id
      name
      coverImageFile {
        container
        blobName
        name
      }
      logoImageFile {
        container
        blobName
        name
      }
    }
  }
`;

/**
 * __useCompaniesPublicdataQuery__
 *
 * To run a query within a React component, call `useCompaniesPublicdataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesPublicdataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesPublicdataQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCompaniesPublicdataQuery(
  baseOptions: Apollo.QueryHookOptions<
    CompaniesPublicdataQuery,
    CompaniesPublicdataQueryVariables
  > &
    (
      | { variables: CompaniesPublicdataQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CompaniesPublicdataQuery,
    CompaniesPublicdataQueryVariables
  >(CompaniesPublicdataDocument, options);
}
export function useCompaniesPublicdataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CompaniesPublicdataQuery,
    CompaniesPublicdataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CompaniesPublicdataQuery,
    CompaniesPublicdataQueryVariables
  >(CompaniesPublicdataDocument, options);
}
export function useCompaniesPublicdataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CompaniesPublicdataQuery,
    CompaniesPublicdataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CompaniesPublicdataQuery,
    CompaniesPublicdataQueryVariables
  >(CompaniesPublicdataDocument, options);
}
export type CompaniesPublicdataQueryHookResult = ReturnType<
  typeof useCompaniesPublicdataQuery
>;
export type CompaniesPublicdataLazyQueryHookResult = ReturnType<
  typeof useCompaniesPublicdataLazyQuery
>;
export type CompaniesPublicdataSuspenseQueryHookResult = ReturnType<
  typeof useCompaniesPublicdataSuspenseQuery
>;
export type CompaniesPublicdataQueryResult = Apollo.QueryResult<
  CompaniesPublicdataQuery,
  CompaniesPublicdataQueryVariables
>;
