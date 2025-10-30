'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import BaseSavedSearchesPage from '@/app/_components/BaseSavedSearchesPage';
import { useSavedSearchesQuery } from '@/graphql/queries/saved-search/savedSearches.generated';
import { SortOrder } from '@/graphql/types';

export default function Page() {
  const userId = useParams().gebruikerId;
  const { data, loading } = useSavedSearchesQuery({
    variables: {
      orderBy: [{ updatedAt: SortOrder.Desc }],
      where: { userId: { equals: Number(userId) } },
    },
  });

  return (
    <BaseSavedSearchesPage
      hasToolbar={false}
      hasMatchesCount={false}
      hasButtons={false}
      data={data}
      loading={loading}
    />
  );
}
