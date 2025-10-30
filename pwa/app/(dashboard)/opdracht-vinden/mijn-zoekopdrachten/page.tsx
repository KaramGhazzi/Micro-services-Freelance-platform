'use client';
import React from 'react';
import BaseSavedSearchesPage from '@/app/_components/BaseSavedSearchesPage';
import { useMySavedSearchesQuery } from '@/graphql/queries/saved-search/mySavedSearch.generated';
import { SortOrder } from '@/graphql/types';

export default function Page() {
  const { data, loading } = useMySavedSearchesQuery({
    variables: {
      orderBy: [{ updatedAt: SortOrder.Desc }],
    },
  });
  return (
    <BaseSavedSearchesPage
      hasToolbar={true}
      hasMatchesCount={true}
      hasButtons={true}
      data={data}
      loading={loading}
    />
  );
}
