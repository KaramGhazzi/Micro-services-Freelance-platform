import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReviewsQueryVariables = Types.Exact<{
  where: Types.ReviewWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.ReviewOrderByWithRelationInput>
    | Types.ReviewOrderByWithRelationInput
  >;
}>;

export type ReviewsQuery = {
  __typename?: 'Query';
  count: number;
  reviews: Array<{
    __typename?: 'Review';
    id: string;
    type: Types.ReviewType;
    createdAt: any;
    content?: string | null;
    createdBy: {
      __typename?: 'User';
      firstName?: string | null;
      lastName?: string | null;
    };
    receivedBy: {
      __typename?: 'User';
      firstName?: string | null;
      lastName?: string | null;
    };
    assignment?: {
      __typename?: 'Assignment';
      title?: string | null;
      company: { __typename?: 'Company'; name?: string | null };
    } | null;
  }>;
};

export const ReviewsDocument = gql`
  query reviews(
    $where: ReviewWhereInput!
    $skip: Int
    $take: Int
    $orderBy: [ReviewOrderByWithRelationInput!]
  ) {
    count: countReviews(where: $where)
    reviews(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      type
      createdBy {
        firstName
        lastName
      }
      receivedBy {
        firstName
        lastName
      }
      createdAt
      content
      assignment {
        title
        company {
          name
        }
      }
    }
  }
`;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables> &
    ({ variables: ReviewsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    options
  );
}
export function useReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    options
  );
}
export function useReviewsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ReviewsQuery,
    ReviewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    options
  );
}
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsSuspenseQueryHookResult = ReturnType<
  typeof useReviewsSuspenseQuery
>;
export type ReviewsQueryResult = Apollo.QueryResult<
  ReviewsQuery,
  ReviewsQueryVariables
>;
